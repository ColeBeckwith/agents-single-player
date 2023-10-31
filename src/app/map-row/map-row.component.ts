import { Component, Input } from '@angular/core';

import { Cell } from '../services/map.service';

@Component({
  selector: 'app-map-row',
  templateUrl: './map-row.component.html',
  styleUrls: ['./map-row.component.scss']
})
export class MapRowComponent {
	@Input() row: Cell[];
}
