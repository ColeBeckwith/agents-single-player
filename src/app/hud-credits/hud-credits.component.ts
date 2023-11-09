import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { CharacterService } from '../services/character.service';

@Component({
	selector: 'app-hud-credits',
	templateUrl: './hud-credits.component.html',
	styleUrls: ['./hud-credits.component.scss'],
})
export class HudCreditsComponent {
	public credits$: Observable<number>;

	constructor(private characterService: CharacterService) {}

	ngOnInit() {
		this.credits$ = this.characterService.listen('credits');
	}
}
