import { Injectable } from '@angular/core';

import { AbilityCard, combatCards, magicCards, stealthCards, techCards } from '../card-data/ability-cards';
import { RocXService } from '../roc-x/roc-x.service';
import { deepClone } from '../utils/deep-clone';
import { PlayerCharacter } from './character.service';

@Injectable({
	providedIn: 'root',
})
export class AbilityCardDraftService extends RocXService {
	constructor() {
		super({
			draftableCards: [],
		});
	}

	initializeDraft(playerCharacter: PlayerCharacter) {
		const playerSkills = playerCharacter.stats.skills;
		// Get total stat points of the player.
		const totalStatPoints =
			playerSkills.combat +
			playerSkills.magic +
			playerSkills.tech +
			playerSkills.stealth;
		// Give them a number of cards based on the total stat points
		const numberOfDraftableCards = Math.floor(totalStatPoints / 1.5);
		const draftableCards = [];

		for (let i = 0; i < numberOfDraftableCards; i++) {
			const chanceForType = Math.random() * totalStatPoints;
			let cardPool: AbilityCard[];
			// Select which ability type to pull from. They should get more cards from skills they have higher stats in.
			if (chanceForType < playerSkills.combat) {
				cardPool = combatCards;
			} else if (
				chanceForType <
				playerSkills.combat + playerSkills.magic
			) {
				cardPool = magicCards;
			} else if (
				chanceForType <
				playerSkills.combat + playerSkills.magic + playerSkills.tech
			) {
				cardPool = techCards;
			} else {
				cardPool = stealthCards;
			}
			// decide on the rarity for the card.
			const raritySchedule = [0, 0.8, 0.95];
			const chanceForRarity = Math.random();
			const cardRarity = raritySchedule.filter(
				(rarities) => chanceForRarity > rarities
			).length;
			// Get only the cards of that rarity from the specific pool
			const possibleCards = cardPool.filter(
				(card) => card.rarity === cardRarity
			);
			// Pick a random card from that pool and add a clone of it to the draftable cards.
			draftableCards.push(
				deepClone(
					possibleCards[
						Math.floor(Math.random() * possibleCards.length)
					]
				)
			);
		}

		// save the draftable cards to the state.
		this.set('draftableCards', draftableCards);
	}
}
