import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, takeUntil } from 'rxjs';

import { EventBusService } from '../services/event-bus.service';
import { PhaseService } from '../services/phase.service';
import { SubscriberComponent } from '../subscriber/subscriber.component';

@Component({
	selector: 'app-run',
	templateUrl: './run.component.html',
	styleUrls: ['./run.component.scss'],
})
export class RunComponent extends SubscriberComponent {
	public abilityCardDrafting$: Observable<boolean>;
	public encounterPhase$: Observable<boolean>;

	constructor(
		private phaseService: PhaseService,
		private eventBusService: EventBusService,
		private router: Router
	) {
		super();
	}

	ngOnInit() {
		this.abilityCardDrafting$ = this.phaseService.listen(
			'abilityCardDrafting'
		);
		this.encounterPhase$ = this.phaseService.listen('encounter');
		this.eventBusService.playerDied$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(() => {
				this.router.navigate(['game-over']);
			});
	}
}
