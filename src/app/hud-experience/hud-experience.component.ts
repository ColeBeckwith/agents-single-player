import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { CharacterService } from '../services/character.service';

@Component({
	selector: 'app-hud-experience',
	templateUrl: './hud-experience.component.html',
	styleUrls: ['./hud-experience.component.scss'],
})
export class HudExperienceComponent {
	public experience$: Observable<number>;

	constructor(private characterService: CharacterService) {
		this.experience$ = this.characterService.listen('experience');
	}
}
