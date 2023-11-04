import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { PhaseService } from '../services/phase.service';

@Component({
	selector: 'app-hud-phase',
	templateUrl: './hud-phase.component.html',
	styleUrls: ['./hud-phase.component.scss'],
})
export class HudPhaseComponent {
	public movementPhase$: Observable<boolean>;
	public encounterPhase$: Observable<boolean>;
	public abilityCardDrafting$: Observable<boolean>;
	public alertLevelPhase$: Observable<boolean>;
	
	constructor(private phaseService: PhaseService) {
		this.movementPhase$ = this.phaseService.listen('movement');
		this.encounterPhase$ = this.phaseService.listen('encounter');
		this.abilityCardDrafting$ = this.phaseService.listen('abilityCardDrafting');
		this.alertLevelPhase$ = this.phaseService.listen('alertLevel');
	}
}
