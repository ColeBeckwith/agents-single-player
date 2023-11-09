import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { combineLatest, Observable, takeUntil } from 'rxjs';

import { AbilityCard } from '../card-data/ability-cards';
import { EncounterCard } from '../card-data/encounter-cards';
import { AbilityCardService } from '../services/ability-card.service';
import { EncounterResolutionService } from '../services/encounter-resolution.service';
import { EncounterService } from '../services/encounter.service';
import { SubscriberComponent } from '../subscriber/subscriber.component';

@Component({
	selector: 'app-encounter-table',
	templateUrl: './encounter-table.component.html',
	styleUrls: ['./encounter-table.component.scss'],
})
export class EncounterTableComponent extends SubscriberComponent {
	public activeEncounter$: Observable<EncounterCard>;
	public encounterStage$: Observable<AbilityCard[]>;
	public stagedValue$: Observable<number>;
	public passing: boolean;

	constructor(
		private encounterService: EncounterService,
		private abilityCardService: AbilityCardService,
		private encounterResolutionService: EncounterResolutionService
	) {
		super();
	}

	ngOnInit() {
		this.activeEncounter$ = this.encounterService.listen('activeEncounter');
		this.encounterStage$ = this.abilityCardService.listen('encounterStage');
		this.stagedValue$ = this.encounterResolutionService.listen('stagedValue');

		combineLatest([this.stagedValue$, this.activeEncounter$])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(([stagedValue, activeEncounter]) => {
				if (activeEncounter) {
					this.passing = stagedValue >= activeEncounter.difficulty;
				}
			});
	}

	handleAbilityCardDropped(event: CdkDragDrop<any>) {
		if (event.previousContainer !== event.container) {
			const movedCard = this.abilityCardService.grab('abilityCardHand')[event.previousIndex];
			this.abilityCardService.moveCardFromHandToEncounterStage(movedCard, event.currentIndex);
		}
	}

	submitStagedCards() {
		this.encounterResolutionService.resolveActiveEncounter();
	}
}
