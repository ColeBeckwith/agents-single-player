import { Component, HostListener } from '@angular/core';

import { Cell, MapService } from '../services/map.service';
import { PhaseService } from '../services/phase.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent {
	public map: Cell[][];

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) { 
		const movementPhase = this.phaseService.grab('movement');
		if (movementPhase) {
			if (event.code === 'KeyW' || event.code === 'ArrowUp') {
				this.mapService.playerWalksUp();
			} else if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
				this.mapService.playerWalksLeft();
			} else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
				this.mapService.playerWalksDown();
			} else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
				this.mapService.playerWalksRight();
			}
		}
	}

	constructor(private mapService: MapService, private phaseService: PhaseService) {
		this.mapService.listen('currentMap').subscribe(currentMap => {
			this.map = currentMap;
		});
	}
}
