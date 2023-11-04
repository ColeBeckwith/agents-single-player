import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { MapService } from '../services/map.service';
import { PhaseService } from '../services/phase.service';

@Component({
	selector: 'app-hud-movement-points',
	templateUrl: './hud-movement-points.component.html',
	styleUrls: ['./hud-movement-points.component.scss'],
})
export class HudMovementPointsComponent {
	public movementPhase$: Observable<boolean>;
	public movementPoints$: Observable<number>;

	constructor(
		private mapService: MapService,
		private phaseService: PhaseService
	) {}

	ngOnInit() {
		this.movementPhase$ = this.phaseService.listen('movement');
		this.movementPoints$ = this.mapService.listen('movementPoints');
	}

	finishMovement() {
		this.mapService.finishMovementPhase();
	}
}
