import { Injectable } from '@angular/core';

import { AbilityCard, combatCards, magicCards, stealthCards, techCards } from '../card-data/ability-cards';
import { RocXService } from '../roc-x/roc-x.service';
import { deepClone } from '../utils/deep-clone';
import { CharacterService, PlayerCharacter } from './character.service';

@Injectable({
	providedIn: 'root',
})
export class AbilityCardDraftService extends RocXService {
	private mint = 1;

	constructor(private characterService: CharacterService) {
		super({
			draftableCards: [],
		});
	}

	public initializeDraft(playerCharacter: PlayerCharacter) {
		this.refreshDraftableCards(playerCharacter);
	}

	public refreshDraftableCards(playerCharacter: PlayerCharacter) {
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

			const draftableCard: AbilityCard =
				possibleCards[Math.floor(Math.random() * possibleCards.length)];

			this.mintCard(draftableCard);
			draftableCards.push(draftableCard);
		}

		// save the draftable cards to the state.
		this.set('draftableCards', draftableCards);
	}

	public purchaseCard(abilityCard: AbilityCard) {
		const draftableCards: AbilityCard[] = this.grab('draftableCards');
		const playerCharacter: PlayerCharacter = this.characterService.grab('playerCharacter');
		const purchasedCard = draftableCards.find((draftableCard: AbilityCard) => draftableCard.mint === abilityCard.mint);
		if (purchasedCard && this.checkAbilityCardAffordable(purchasedCard, playerCharacter)) {
			this.characterService.addAbilityCardToDeck(purchasedCard);
			this.characterService.adjustSkillPoints(purchasedCard.primaryType, purchasedCard.cost);
		}

		console.log(this.grab('draftableCards').find((draftableCard: AbilityCard) => draftableCard.mint === abilityCard.mint));
	}

	public checkAbilityCardAffordable(
		abilityCard: AbilityCard,
		playerCharacter: PlayerCharacter
	): boolean {
		return (
			playerCharacter.stats.skillPoints[abilityCard.primaryType] >=
			abilityCard.cost
		);
	}

	private mintCard(abilityCard: AbilityCard) {
		console.log(this.mint);
		// Deep clone at this point since we are wanting the create a new version of this card. 
		const mintedCard = deepClone(abilityCard);
		// Assign the mint value and increment it.
		abilityCard.mint = this.mint;
		this.mint++;
		return mintedCard;
	}
}
