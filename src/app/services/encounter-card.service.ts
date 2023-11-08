import { Injectable } from '@angular/core';

import {
	EncounterCard,
	levelFourEncounterCards,
	levelOneEncounterCards,
	levelThreeEncounterCards,
	levelTwoEncounterCards
} from '../card-data/encounter-cards';
import { deepClone } from '../utils/deep-clone';

@Injectable({
	providedIn: 'root',
})
export class EncounterCardService {
	private mint = 1;

	constructor() {}

	public getRandomEncounterCard(difficulty: 1 | 2 | 3 | 4) {
		const cardPools = [levelOneEncounterCards, levelTwoEncounterCards, levelThreeEncounterCards, levelFourEncounterCards];
		const selectedCardPool = cardPools[difficulty - 1];
		return this.mintCard(selectedCardPool[Math.floor(Math.random() * selectedCardPool.length)]);
	}

	public mintCard(encounterCard: EncounterCard) {
		// Deep clone at this point since we are wanting the create a new version of this card.
		const mintedCard = deepClone(encounterCard);
		// Assign the mint value and increment it.
		mintedCard.mint = this.mint;
		this.mint++;
		return mintedCard;
	}
}
