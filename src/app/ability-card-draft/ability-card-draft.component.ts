import { Component } from '@angular/core';

import { Observable, takeUntil } from 'rxjs';

import { AbilityCard } from '../card-data/ability-cards';
import { AbilityCardDraftService } from '../services/ability-card-draft.service';
import { CharacterService, PlayerCharacter } from '../services/character.service';
import { SubscriberComponent } from '../subscriber/subscriber.component';

@Component({
	selector: 'app-ability-card-draft',
	templateUrl: './ability-card-draft.component.html',
	styleUrls: ['./ability-card-draft.component.scss'],
})
export class AbilityCardDraftComponent extends SubscriberComponent {
	public draftableCards$: Observable<AbilityCard[]>;
	public playerCredits: number;
	public playerCharacter$: Observable<PlayerCharacter>;

	constructor(
		private abilityCardDraftService: AbilityCardDraftService,
		private characterService: CharacterService
	) {
		super();
	}

	ngOnInit() {
		this.draftableCards$ =
			this.abilityCardDraftService.listen('draftableCards');
		this.playerCharacter$ = this.characterService.listen('playerCharacter');
		this.playerCharacter$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((playerCharacter: PlayerCharacter) => {
				this.playerCredits = playerCharacter.stats.credits;
			});
	}

	refreshAbilityCards() {
		if (this.playerCredits >= 1) {
			this.characterService.adjustCredits(-1);
			this.abilityCardDraftService.refreshDraftableCards(this.characterService.grab('playerCharacter'));
		}
	}

	purchaseCard() {
		
	}

	finishDraft() {

	}
}
