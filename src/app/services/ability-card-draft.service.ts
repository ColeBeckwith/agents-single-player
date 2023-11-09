import { Injectable } from '@angular/core';

import { filter } from 'rxjs';

import { AbilityCard } from '../card-data/ability-cards';
import { combatCards } from '../card-data/ability-cards/combat-cards';
import { magicCards } from '../card-data/ability-cards/magic-cards';
import { stealthCards } from '../card-data/ability-cards/stealth-cards';
import { techCards } from '../card-data/ability-cards/tech-cards';
import { RocXService } from '../roc-x/roc-x.service';
import { AbilityCardService } from './ability-card.service';
import { AbilityStats, CharacterService } from './character.service';
import { PhaseService } from './phase.service';

@Injectable({
	providedIn: 'root',
})
export class AbilityCardDraftService extends RocXService {
	constructor(
		private characterService: CharacterService,
		private phaseService: PhaseService,
		private abilityCardService: AbilityCardService
	) {
		super({
			draftableCards: [],
		});

		this.phaseService
			.listen('abilityCardDrafting')
			.pipe(filter(Boolean))
			.subscribe(() => {
				const playerAbilityStats = this.characterService.grabAbilityStats();
				this.initializeDraft(playerAbilityStats);
			});
	}

	public initializeDraft(abilityStats: AbilityStats) {
		this.refreshDraftableCards(abilityStats);
	}

	public refreshDraftableCards(abilityStats: AbilityStats) {
		// Get total stat points of the player.
		const totalStatPoints = abilityStats.combat + abilityStats.magic + abilityStats.tech + abilityStats.stealth;
		// Give them a number of cards based on the total stat points
		const numberOfDraftableCards = Math.floor(totalStatPoints / 1.5);
		const draftableCards = [];

		for (let i = 0; i < numberOfDraftableCards; i++) {
			const draftableCard = this.getDraftCard(this.characterService.grabAbilityStats());
			draftableCards.push(draftableCard);
		}

		// save the draftable cards to the state.
		this.set('draftableCards', draftableCards);
	}

	public purchaseCard(abilityCard: AbilityCard) {
		const draftableCards: AbilityCard[] = this.grab('draftableCards');
		const purchasedCardIndex = draftableCards.findIndex(
			(draftableCard: AbilityCard) => draftableCard.mint === abilityCard.mint
		);
		const purchasedCard = draftableCards[purchasedCardIndex];
		if (
			purchasedCard &&
			this.checkAbilityCardAffordable(purchasedCard, this.characterService.grabPointsByType(purchasedCard.primaryType))
		) {
			this.abilityCardService.addAbilityCardToDeck(purchasedCard);
			this.characterService.adjustSkillPoints(purchasedCard.primaryType, purchasedCard.cost * -1);
			draftableCards.splice(purchasedCardIndex, 1);
			const replacementCard = this.getDraftCard(this.characterService.grabAbilityStats());
			draftableCards.push(replacementCard);
			this.set('draftableCards', draftableCards);
		}
	}

	public checkAbilityCardAffordable(abilityCard: AbilityCard, skillPoints: number): boolean {
		return skillPoints >= abilityCard.cost;
	}

	public getDraftCard(abilityStats: AbilityStats) {
		// Get total stat points of the player.
		const totalStatPoints = abilityStats.combat + abilityStats.magic + abilityStats.tech + abilityStats.stealth;

		const chanceForType = Math.random() * totalStatPoints;
		let cardPool: AbilityCard[];
		// Select which ability type to pull from. They should get more cards from skills they have higher stats in.
		let chanceForRarity: number;
		if (chanceForType < abilityStats.combat) {
			// Use the combat pool.
			cardPool = combatCards;
			// Give higher rarity cards the higher the player combat skill is.
			chanceForRarity = Math.random() * (abilityStats.combat / 5);
		} else if (chanceForType < abilityStats.combat + abilityStats.magic) {
			// Use the magic pool
			cardPool = magicCards;
			// Give higher rarity cards the higher the player magic skill is.
			chanceForRarity = Math.random() * (abilityStats.magic / 5);
		} else if (chanceForType < abilityStats.combat + abilityStats.magic + abilityStats.tech) {
			// Use the tech pool
			cardPool = techCards;
			// Give higher rarity cards the higher the player tech skill is.
			chanceForRarity = Math.random() * (abilityStats.tech / 5);
		} else {
			// Use the stealth pool
			cardPool = stealthCards;
			// Give higher rarity cards the higher the player stealth skill is.
			chanceForRarity = Math.random() * (abilityStats.stealth / 5);
		}
		// decide on the rarity for the card.
		const raritySchedule = [0, 0.8, 0.95];
		const cardRarity = raritySchedule.filter((rarities) => chanceForRarity > rarities).length;
		// Get only the cards of that rarity from the specific pool
		const possibleCards = cardPool.filter((card) => card.rarity === cardRarity);
		// Pick a random card from that pool and add a clone of it to the draftable cards.

		const draftableCard: AbilityCard = possibleCards[Math.floor(Math.random() * possibleCards.length)];
		const mintedCard = this.abilityCardService.mintCard(draftableCard);
		return mintedCard;
	}
}
