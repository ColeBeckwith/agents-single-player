import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { CharacterService, PlayerCharacter } from '../services/character.service';

@Component({
	selector: 'app-hud-skills',
	templateUrl: './hud-skills.component.html',
	styleUrls: ['./hud-skills.component.scss'],
})
export class HudSkillsComponent {
	public playerCharacter: PlayerCharacter;
	public magicStat$: Observable<number>;
	public combatStat$: Observable<number>;
	public stealthStat$: Observable<number>;
	public techStat$: Observable<number>;
	public magicPoints$: Observable<number>;
	public combatPoints$: Observable<number>;
	public stealthPoints$: Observable<number>;
	public techPoints$: Observable<number>;

	constructor(private characterService: CharacterService) {
		this.magicStat$ = this.characterService.listen('magicStat');
		this.combatStat$ = this.characterService.listen('combatStat');
		this.stealthStat$ = this.characterService.listen('stealthStat');
		this.techStat$ = this.characterService.listen('techStat');
		this.magicPoints$ = this.characterService.listen('magicPoints');
		this.combatPoints$ = this.characterService.listen('combatPoints');
		this.stealthPoints$ = this.characterService.listen('stealthPoints');
		this.techPoints$ = this.characterService.listen('techPoints');
	}
}
