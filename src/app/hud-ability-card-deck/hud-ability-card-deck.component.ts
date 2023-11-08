import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AbilityCard } from '../card-data/ability-cards';
import { AbilityCardService } from '../services/ability-card.service';

@Component({
  selector: 'app-hud-ability-card-deck',
  templateUrl: './hud-ability-card-deck.component.html',
  styleUrls: ['./hud-ability-card-deck.component.scss']
})
export class HudAbilityCardDeckComponent {
	public abilityCardDraw$: Observable<AbilityCard[]>;
	public abilityCardDisard$: Observable<AbilityCard[]>;
	
	constructor(private abilityCardService: AbilityCardService) {
	}

	ngOnInit() {
		this.abilityCardDraw$ = this.abilityCardService.listen('abilityCardDraw');
		this.abilityCardDisard$ = this.abilityCardService.listen('abilityCardDiscard');
	}

	handleAbilityCardDropped(event: CdkDragDrop<any>) {
		if (event.container !== event.previousContainer) {
			const movedCard = this.abilityCardService.grab('encounterStage')[event.previousIndex];
			this.abilityCardService.moveCardFromEncounterStageToDraw(movedCard, event.currentIndex);
		}
	}

}
