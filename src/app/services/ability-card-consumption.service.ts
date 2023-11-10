import { Injectable } from '@angular/core';

import { AbilityCard, AbilityCardId } from '../card-data/ability-cards';
import { AbilityCardService } from './ability-card.service';
import { MapService } from './map.service';
import { PhaseService } from './phase.service';

@Injectable({
	providedIn: 'root',
})
export class AbilityCardConsumptionService {
	constructor(
		private abilityCardService: AbilityCardService,
		private mapService: MapService,
		private phaseService: PhaseService
	) {}

	public consumeAbilityCard(abilityCard: AbilityCard) {
		if (abilityCard.id === AbilityCardId.RUN_N_GUN) {
			if (this.phaseService.grab('movement')) {
				this.mapService.addMovementPoints(1);
			} else {
				return;
			}
		}

		const abilityCardHand: AbilityCard[] = this.abilityCardService.grab('abilityCardHand');
		const abilityCardDraw: AbilityCard[] = this.abilityCardService.grab('abilityCardDraw');
		if (abilityCardHand.find(abilityCardInHand => abilityCardInHand.mint === abilityCard.mint)) {
			this.abilityCardService.discardAbilityCardFromHand(abilityCard);
		}
		if (abilityCardDraw.find(abilityCardInDraw => abilityCardInDraw.mint === abilityCard.mint)) {
			this.abilityCardService.discardAbilityCardFromDraw(abilityCard);
		}
	}
}
