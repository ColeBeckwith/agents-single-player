import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AbilityCardDraftService } from '../services/ability-card-draft.service';
import { BaseCharacter, CharacterService } from '../services/character.service';
import { MapService } from '../services/map.service';

@Component({
	selector: 'app-run-setup',
	templateUrl: './run-setup.component.html',
	styleUrls: ['./run-setup.component.scss'],
})
export class RunSetupComponent {
	public selectedCharacter: BaseCharacter | null = null;
	public selectedScenario: number | null = null;

	public characters: BaseCharacter[];

	public selectCharacter(character: BaseCharacter) {
		this.selectedCharacter = character;
	}

	selectDifficulty(difficulty: number) {
		this.selectedScenario = difficulty;
	}

	startRun() {
		const playerCharacter = this.characterService.initializePlayerCharacterFromBaseCharacter(
			this.selectedCharacter
				? this.selectedCharacter
				: this.characters[
						Math.floor(Math.random() * this.characters.length)
				  ]
		);
		this.mapService.generateMap(12, 12, .3);
		this.abilityCardDraftService.initializeDraft(playerCharacter);
		this.router.navigate(['/run']);
	}

	constructor(
		private characterService: CharacterService,
		private router: Router,
		private mapService: MapService,
		private abilityCardDraftService: AbilityCardDraftService
	) {
		this.characters = this.characterService.grab('baseCharacters');
	}
}
