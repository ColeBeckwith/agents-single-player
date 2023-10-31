import { Component } from '@angular/core';

import { CharacterService, PlayerCharacter } from '../services/character.service';

@Component({
	selector: 'app-hud-avatar',
	templateUrl: './hud-avatar.component.html',
	styleUrls: ['./hud-avatar.component.scss'],
})
export class HudAvatarComponent {
	public playerCharacter: PlayerCharacter;

	constructor(private characterService: CharacterService) {
		this.characterService
			.listen('playerCharacter')
			.subscribe((playerCharacter) => {
				this.playerCharacter = playerCharacter;
			});
	}
}
