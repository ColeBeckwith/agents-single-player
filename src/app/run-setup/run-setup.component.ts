import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BaseCharacter } from '../card-data/base-characters';
import { CharacterService } from '../services/character.service';
import { MapService } from '../services/map.service';
import { PhaseService } from '../services/phase.service';

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
		this.selectedCharacter
			? this.characterService.initializePlayerCharacterFromBaseCharacter(
					this.selectedCharacter
			  )
			: this.characterService.initializeRandomCharacter();
		this.mapService.generateMap(10, 10, 0.3);
		this.phaseService.startNewGame();
		this.router.navigate(['/run']);
	}

	constructor(
		private characterService: CharacterService,
		private router: Router,
		private mapService: MapService,
		private phaseService: PhaseService
	) {
		this.characters = this.characterService.grab('baseCharacters');
	}
}
