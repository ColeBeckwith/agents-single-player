import { Injectable } from '@angular/core';

import { AbilityCard, AbilityCardId, AbilityCardType } from '../card-data/ability-cards';
import { EncounterCard, EncounterConsequences } from '../card-data/encounter-cards';
import { RocXService } from '../roc-x/roc-x.service';
import { AbilityCardService } from './ability-card.service';
import { AlertLevelService } from './alert-level.service';
import { CharacterService } from './character.service';
import { EncounterService } from './encounter.service';
import { EventBusService } from './event-bus.service';
import { MapService } from './map.service';
import { PhaseService } from './phase.service';

@Injectable({
	providedIn: 'root',
})
export class EncounterResolutionService extends RocXService {
	constructor(
		private abilityCardService: AbilityCardService,
		private encounterService: EncounterService,
		private characterService: CharacterService,
		private alertLevelService: AlertLevelService,
		private phaseService: PhaseService,
		private eventBusService: EventBusService,
		private mapService: MapService
	) {
		super({
			stagedValue: 0,
		});

		this.eventBusService.encounterStageCardsChanged$.subscribe(() => {
			this.handleEncounterStageChange();
		});

		this.encounterService.listen('activeEncounter').subscribe((activeEncounter) => {
			this.handleActiveEncounterChange();
		});
	}

	public resolveActiveEncounter() {
		const activeEncounter = this.encounterService.grab('activeEncounter');
		this.resolveEncounter(this.grab('stagedValue'), activeEncounter, this.abilityCardService.grab('encounterStage'));
	}

	public resolveEncounter(
		playerProvidedValue: number,
		encounterCard: EncounterCard,
		playedAbilityCards: AbilityCard[]
	) {
		const success = playerProvidedValue >= encounterCard.difficulty;
		const failure = !success;

		this.resolvePlayedAbilityCards(playedAbilityCards, success);

		// Succeeded
		if (success) {
			this.mapService.removeEncounterByMint(encounterCard.mint!);

			if (encounterCard.successConsequences) {
				this.applyConsequences(encounterCard.successConsequences, true);
			}
		}

		// Failed
		if (failure) {
			if (encounterCard.failureConsequences) {
				this.applyConsequences(encounterCard.failureConsequences, false);
			}
		}

		this.abilityCardService.discardEncounterStage();
		this.abilityCardService.returnHandToDraw();
		this.phaseService.completeEncounterPhase();
		this.encounterService.set('activeEncounter', null);
	}

	public resolvePlayedAbilityCards(abilityCards: AbilityCard[], success: boolean) {
		abilityCards.forEach((abilityCard) => {
			if (abilityCard.encounterConsequences) {
				this.applyConsequences(abilityCard.encounterConsequences, success);
			}
			if (abilityCard.encounterSuccessConsequences && success) {
				this.applyConsequences(abilityCard.encounterSuccessConsequences, success);
			}
			if (abilityCard.encounterFailureConsequences && !success) {
				this.applyConsequences(abilityCard.encounterFailureConsequences, success);
			}
		});
	}

	private applyConsequences(consequences: EncounterConsequences, success: boolean) {
		if (consequences.credits) {
			this.characterService.adjustCredits(consequences.credits);
		}
		if (consequences.maxHealth) {
			this.characterService.modifyMaxHealth(consequences.maxHealth);
		}
		if (consequences.alertLevel) {
			this.alertLevelService.adjustAlertLevel(consequences.alertLevel);
		}
		if (consequences.combatSkillPoints) {
			this.characterService.adjustSkillPoints('combat', consequences.combatSkillPoints);
		}
		if (consequences.techSkillPoints) {
			this.characterService.adjustSkillPoints('tech', consequences.techSkillPoints);
		}
		if (consequences.stealthSkillPoints) {
			this.characterService.adjustSkillPoints('stealth', consequences.stealthSkillPoints);
		}
		if (consequences.magicSkillPoints) {
			this.characterService.adjustSkillPoints('magic', consequences.magicSkillPoints);
		}
		if (consequences.combatStat) {
			this.characterService.adjustAbilityStat('combat', consequences.combatStat);
		}
		if (consequences.techStat) {
			this.characterService.adjustAbilityStat('tech', consequences.techStat);
		}
		if (consequences.stealthStat) {
			this.characterService.adjustAbilityStat('stealth', consequences.stealthStat);
		}
		if (consequences.magicStat) {
			this.characterService.adjustAbilityStat('magic', consequences.magicStat);
		}
		if (consequences.health) {
			if (consequences.health > 0) {
				this.characterService.increaseHealth(consequences.health);
			}
			if (consequences.health < 0) {
				this.characterService.reduceHealth(consequences.health * -1);
			}
		}
		if (consequences.defaultMovementPoints) {
			this.characterService.modifyDefaultMovementPoints(consequences.defaultMovementPoints);
		}
	}

	private handleActiveEncounterChange() {
		this.calculateStagedValue();
	}

	private handleEncounterStageChange() {
		this.calculateStagedValue();
	}

	private calculateStagedValue() {
		const encounterStage: AbilityCard[] = this.abilityCardService.grab('encounterStage');
		const activeEncounter = this.encounterService.grab('activeEncounter');
		if (activeEncounter) {
			let stagedValue = 0;
			encounterStage.forEach((stagedAbilityCard) => {
				stagedValue = stagedAbilityCard.encounterValue;

				if (stagedAbilityCard.id === AbilityCardId.AKIMBO) {
					const numberOfAkimboCardsInStage = encounterStage.filter(
						(abilityCard) => abilityCard.id === AbilityCardId.AKIMBO
					).length;

					if (numberOfAkimboCardsInStage === 2) {
						stagedValue *= 2;
					}
				}

				stagedValue *= this.findBestMultiplierForCard(stagedAbilityCard, activeEncounter);
				stagedAbilityCard.stagedValue = stagedValue;
				stagedValue += stagedValue;
			});
			this.abilityCardService.set('encounterStage', encounterStage);
			this.set('stagedValue', stagedValue);
		} else {
			this.set('stagedValue', 0);
		}
	}

	private findBestMultiplierForCard(abilityCard: AbilityCard, encounterCard: EncounterCard): 0.5 | 1 | 2 {
		const bestType = this.findBestTypeForCard(abilityCard, encounterCard);
		if (encounterCard.strongTypes.indexOf(bestType) !== -1) {
			return 2;
		} else if (encounterCard.weakTypes.indexOf(bestType) !== -1) {
			return 0.5;
		} else {
			return 1;
		}
	}

	private findBestTypeForCard(abilityCard: AbilityCard, encounterCard: EncounterCard): AbilityCardType {
		let abilityCardTypes: AbilityCardType[] = abilityCard.secondaryTypes
			? [abilityCard.primaryType, ...abilityCard.secondaryTypes]
			: [abilityCard.primaryType];

		// Check to see if any strong types are matched.
		for (let i = 0; i < abilityCardTypes.length; i++) {
			if (encounterCard.strongTypes.indexOf(abilityCardTypes[i]) !== -1) {
				return abilityCardTypes[i];
			}
		}

		// Check to see if there are any neturals.
		for (let i = 0; i < abilityCardTypes.length; i++) {
			if (
				encounterCard.strongTypes.indexOf(abilityCardTypes[i]) === -1 &&
				encounterCard.weakTypes.indexOf(abilityCardTypes[i]) === -1
			) {
				return abilityCardTypes[i];
			}
		}

		// Check to see if any weak types are matched.
		for (let i = 0; i < abilityCardTypes.length; i++) {
			if (encounterCard.weakTypes.indexOf(abilityCardTypes[i]) !== -1) {
				return abilityCardTypes[i];
			}
		}

		console.error('No types were strong, neutral or weak for this card.');
		return abilityCard.primaryType;
	}
}
