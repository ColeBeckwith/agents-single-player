import { Pipe, PipeTransform } from '@angular/core';

import { AbilityCard } from '../card-data/ability-cards';
import { AbilityCardDraftService } from '../services/ability-card-draft.service';

@Pipe({
	name: 'abilityCardAffordable',
})
export class AbilityCardAffordablePipe implements PipeTransform {
	constructor(private abilityCardDraftService: AbilityCardDraftService) {}

	transform(
		playerSkillPoints: { magic: number; stealth: number; combat: number; tech: number },
		...args: AbilityCard[]
	): boolean {
		return this.abilityCardDraftService.checkAbilityCardAffordable(args[0], playerSkillPoints[args[0].primaryType]);
	}
}
