import { Component } from '@angular/core';

import { Cell, MapService } from '../services/map.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent {
	public map: Cell[][];

	constructor(private mapService: MapService) {
		this.mapService.listen('currentMap').subscribe(currentMap => {
			this.map = currentMap;
		});
	}
}
