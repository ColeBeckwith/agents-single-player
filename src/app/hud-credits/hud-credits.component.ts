import { Component } from '@angular/core';

import { CharacterService, PlayerCharacter } from '../services/character.service';

@Component({
  selector: 'app-hud-credits',
  templateUrl: './hud-credits.component.html',
  styleUrls: ['./hud-credits.component.scss']
})
export class HudCreditsComponent {

	public playerCredits: number;

	constructor(private characterService: CharacterService) {

	}

	ngOnInit() {
		this.characterService.listen('playerCharacter').subscribe((playerCharacter: PlayerCharacter) => {
			this.playerCredits = playerCharacter.stats.credits;
		});
	}
}

