import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AbilityCard } from '../card-data/ability-cards';
import { AbilityCardConsumptionService } from '../services/ability-card-consumption.service';
import { AbilityCardService } from '../services/ability-card.service';

@Component({
	selector: 'app-hud-ability-card-deck',
	templateUrl: './hud-ability-card-deck.component.html',
	styleUrls: ['./hud-ability-card-deck.component.scss'],
})
export class HudAbilityCardDeckComponent {
	public abilityCardDraw$: Observable<AbilityCard[]>;
	public abilityCardDiscard$: Observable<AbilityCard[]>;
	public abilityCardHand$: Observable<AbilityCard[]>;

	constructor(
		private abilityCardService: AbilityCardService,
		private abilityCardConsumptionService: AbilityCardConsumptionService
	) {}

	ngOnInit() {
		this.abilityCardDraw$ = this.abilityCardService.listen('abilityCardDraw');
		this.abilityCardDiscard$ = this.abilityCardService.listen('abilityCardDiscard');
		this.abilityCardHand$ = this.abilityCardService.listen('abilityCardHand');
	}

	handleAbilityCardDropped(event: CdkDragDrop<any>) {
		if (event.container !== event.previousContainer) {
			const movedCard = this.abilityCardService.grab('encounterStage')[event.previousIndex];
			this.abilityCardService.moveCardFromEncounterStageToHand(movedCard, event.currentIndex);
		}
	}

	consumeAbilityCard(abilityCard: AbilityCard) {
		this.abilityCardConsumptionService.consumeAbilityCard(abilityCard);
	}
}
