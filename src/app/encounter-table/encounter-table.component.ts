import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AbilityCard } from '../card-data/ability-cards';
import { EncounterCard } from '../card-data/encounter-cards';
import { AbilityCardService } from '../services/ability-card.service';
import { EncounterService } from '../services/encounter.service';

@Component({
  selector: 'app-encounter-table',
  templateUrl: './encounter-table.component.html',
  styleUrls: ['./encounter-table.component.scss']
})
export class EncounterTableComponent {
	public activeEncounter$: Observable<EncounterCard>;
	public encounterStage$: Observable<AbilityCard[]>;

	constructor(private encounterService: EncounterService, private abilityCardService: AbilityCardService) {
		this.activeEncounter$ = this.encounterService.listen('activeEncounter');
		this.encounterStage$ = this.abilityCardService.listen('encounterStage');
	}

	handleAbilityCardDropped(event: CdkDragDrop<any>) {
		if (event.previousContainer !== event.container) {
			const movedCard = this.abilityCardService.grab('abilityCardDraw')[event.previousIndex];
			this.abilityCardService.moveCardFromDrawToEncounterStage(movedCard, event.currentIndex);
		}
	}
}
