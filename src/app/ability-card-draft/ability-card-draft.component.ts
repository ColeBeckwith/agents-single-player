import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AbilityCard } from '../card-data/ability-cards';
import { AbilityCardDraftService } from '../services/ability-card-draft.service';
import { CharacterService, PlayerCharacter } from '../services/character.service';
import { PhaseService } from '../services/phase.service';
import { SubscriberComponent } from '../subscriber/subscriber.component';

@Component({
	selector: 'app-ability-card-draft',
	templateUrl: './ability-card-draft.component.html',
	styleUrls: ['./ability-card-draft.component.scss'],
})
export class AbilityCardDraftComponent extends SubscriberComponent {
	public draftableCards$: Observable<AbilityCard[]>;
	public playerCharacter$: Observable<PlayerCharacter>;
	public playerCredits$: Observable<number>;
	public playerSkillPoints$: Observable<any>;

	constructor(
		private abilityCardDraftService: AbilityCardDraftService,
		private characterService: CharacterService,
		private phaseService: PhaseService
	) {
		super();
	}

	ngOnInit() {
		this.draftableCards$ = this.abilityCardDraftService.listen('draftableCards');
		this.playerCredits$ = this.characterService.listen('credits');
		this.playerSkillPoints$ = this.characterService.listenToPlayerSkillPoints();
	}

	refreshAbilityCards() {
		if (this.characterService.grab('credits') >= 1) {
			this.characterService.adjustCredits(-1);
			this.abilityCardDraftService.refreshDraftableCards(this.characterService.grabAbilityStats());
		}
	}

	purchaseCard(abilityCard: AbilityCard) {
		this.abilityCardDraftService.purchaseCard(abilityCard);
	}

	finishDraft() {
		this.phaseService.finishAbilityCardDraft();
	}
}
