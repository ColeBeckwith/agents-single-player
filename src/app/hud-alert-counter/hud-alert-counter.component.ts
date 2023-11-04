import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AlertLevelService } from '../services/alert-level.service';
import { PhaseService } from '../services/phase.service';

@Component({
	selector: 'app-hud-alert-counter',
	templateUrl: './hud-alert-counter.component.html',
	styleUrls: ['./hud-alert-counter.component.scss'],
})
export class HudAlertCounterComponent {
	public alertLevel$: Observable<number>;
	public alertLevelPhase$: Observable<boolean>;

	constructor(
		private alertLevelService: AlertLevelService,
		private phaseService: PhaseService
	) {}

	ngOnInit() {
		this.alertLevel$ = this.alertLevelService.listen('alertLevel');
		this.alertLevelPhase$ = this.phaseService.listen('alertLevel');
	}
}
