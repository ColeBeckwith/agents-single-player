import { Injectable } from '@angular/core';

import { EncounterCard } from '../card-data/encounter-cards';
import { deepClone } from '../utils/deep-clone';

@Injectable({
	providedIn: 'root',
})
export class EncounterCardService {
	private mint = 1;

	constructor() {}

	public mintCard(encounterCard: EncounterCard) {
		// Deep clone at this point since we are wanting the create a new version of this card.
		const mintedCard = deepClone(encounterCard);
		// Assign the mint value and increment it.
		mintedCard.mint = this.mint;
		this.mint++;
		return mintedCard;
	}
}
