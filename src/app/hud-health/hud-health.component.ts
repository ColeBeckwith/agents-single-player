import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { CharacterService } from '../services/character.service';

@Component({
	selector: 'app-hud-health',
	templateUrl: './hud-health.component.html',
	styleUrls: ['./hud-health.component.scss'],
})
export class HudHealthComponent {
	public maxHealth$: Observable<number>;
	public currentHealth$: Observable<number>;

	constructor(private characterService: CharacterService) {
		this.maxHealth$ = this.characterService.listen('maxHealth');
		this.currentHealth$ = this.characterService.listen('currentHealth');
	}
}
