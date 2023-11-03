import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AbilityCard } from '../card-data/ability-cards';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-hud-ability-card-deck',
  templateUrl: './hud-ability-card-deck.component.html',
  styleUrls: ['./hud-ability-card-deck.component.scss']
})
export class HudAbilityCardDeckComponent {
	public abilityCardDraw$: Observable<AbilityCard[]>;
	public abilityCardDisard$: Observable<AbilityCard[]>;
	
	constructor(private characterService: CharacterService) {
	}

	ngOnInit() {
		this.abilityCardDraw$ = this.characterService.listen('abilityCardDraw');
		this.abilityCardDisard$ = this.characterService.listen('abilityCardDiscard');
	}

}
