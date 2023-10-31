import { Component } from '@angular/core';

import { CharacterService, PlayerCharacter } from '../services/character.service';

@Component({
	selector: 'app-hud-experience',
	templateUrl: './hud-experience.component.html',
	styleUrls: ['./hud-experience.component.scss'],
})
export class HudExperienceComponent {
	public playerCharacter: PlayerCharacter;

	constructor(private characterService: CharacterService) {
		this.characterService
			.listen('playerCharacter')
			.subscribe((playerCharacter) => {
				this.playerCharacter = playerCharacter;
			});
	}
}
