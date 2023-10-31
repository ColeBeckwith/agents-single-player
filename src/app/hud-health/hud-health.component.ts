import { Component } from '@angular/core';

import { CharacterService, PlayerCharacter } from '../services/character.service';

@Component({
	selector: 'app-hud-health',
	templateUrl: './hud-health.component.html',
	styleUrls: ['./hud-health.component.scss'],
})
export class HudHealthComponent {
	public playerCharacter: PlayerCharacter;

	constructor(private characterService: CharacterService) {
		this.characterService
			.listen('playerCharacter')
			.subscribe((playerCharacter) => {
				this.playerCharacter = playerCharacter;
			});
	}
}
