import { Pipe, PipeTransform } from '@angular/core';

import { AbilityCard } from '../card-data/ability-cards';
import { AbilityCardDraftService } from '../services/ability-card-draft.service';
import { PlayerCharacter } from '../services/character.service';

@Pipe({
	name: 'abilityCardAffordable',
})
export class AbilityCardAffordablePipe implements PipeTransform {
	constructor(private abilityCardDraftService: AbilityCardDraftService) {}

	transform(playerCharacter: PlayerCharacter | null, ...args: AbilityCard[]): boolean {
		if (!playerCharacter) {
			return false;
		}
		return this.abilityCardDraftService.checkAbilityCardAffordable(args[0], playerCharacter);
	}
}
