import { Component } from '@angular/core';

import { CharacterService, PlayerCharacter } from '../services/character.service';

@Component({
	selector: 'app-hud-skills',
	templateUrl: './hud-skills.component.html',
	styleUrls: ['./hud-skills.component.scss'],
})
export class HudSkillsComponent {
	public playerCharacter: PlayerCharacter;

	constructor(private characterService: CharacterService) {
		this.characterService
			.listen('playerCharacter')
			.subscribe((playerCharacter) => {
				this.playerCharacter = playerCharacter;
			});
	}
}
