import { Component, HostBinding, Input } from '@angular/core';

import { CharacterService, PlayerCharacter } from '../services/character.service';
import { Cell } from '../services/map.service';

@Component({
	selector: 'app-map-cell',
	templateUrl: './map-cell.component.html',
	styleUrls: ['./map-cell.component.scss'],
})
export class MapCellComponent {
	@Input() cell: Cell;

	@HostBinding('class.map-cell--built') builtCell: boolean = false;

	public characterAvatar: string;

	constructor(private characterService: CharacterService) {}

	ngOnInit() {
		this.builtCell = this.cell.built;
		this.characterAvatar = (<PlayerCharacter>this.characterService.grab('playerCharacter')).avatar;
	}
}
