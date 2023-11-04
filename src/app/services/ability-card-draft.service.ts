import { Injectable } from '@angular/core';

import { filter } from 'rxjs';

import { AbilityCard } from '../card-data/ability-cards';
import { combatCards } from '../card-data/ability-cards/combat-cards';
import { magicCards } from '../card-data/ability-cards/magic-cards';
import { stealthCards } from '../card-data/ability-cards/stealth-cards';
import { techCards } from '../card-data/ability-cards/tech-cards';
import { RocXService } from '../roc-x/roc-x.service';
import { AbilityCardService } from './ability-card.service';
import { CharacterService, PlayerCharacter } from './character.service';
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
				const playerCharacter =
					this.characterService.grab('playerCharacter');
				this.initializeDraft(playerCharacter);
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
			const draftableCard = this.getDraftCard(playerCharacter);
			draftableCards.push(draftableCard);
		}

		// save the draftable cards to the state.
		this.set('draftableCards', draftableCards);
	}

	public purchaseCard(abilityCard: AbilityCard) {
		const draftableCards: AbilityCard[] = this.grab('draftableCards');
		const playerCharacter: PlayerCharacter =
			this.characterService.grab('playerCharacter');
		const purchasedCardIndex = draftableCards.findIndex(
			(draftableCard: AbilityCard) =>
				draftableCard.mint === abilityCard.mint
		);
		const purchasedCard = draftableCards[purchasedCardIndex];
		if (
			purchasedCard &&
			this.checkAbilityCardAffordable(purchasedCard, playerCharacter)
		) {
			this.abilityCardService.addAbilityCardToDeck(purchasedCard);
			this.characterService.adjustSkillPoints(
				purchasedCard.primaryType,
				purchasedCard.cost * -1
			);
			draftableCards.splice(purchasedCardIndex, 1);
			const replacementCard = this.getDraftCard(playerCharacter);
			draftableCards.push(replacementCard);
			this.set('draftableCards', draftableCards);
		}
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

	public getDraftCard(playerCharacter: PlayerCharacter) {
		const playerSkills = playerCharacter.stats.skills;
		// Get total stat points of the player.
		const totalStatPoints =
			playerSkills.combat +
			playerSkills.magic +
			playerSkills.tech +
			playerSkills.stealth;

		const chanceForType = Math.random() * totalStatPoints;
		let cardPool: AbilityCard[];
		// Select which ability type to pull from. They should get more cards from skills they have higher stats in.
		let chanceForRarity: number;
		if (chanceForType < playerSkills.combat) {
			// Use the combat pool.
			cardPool = combatCards;
			// Give higher rarity cards the higher the player combat skill is.
			chanceForRarity = Math.random() * (playerSkills.combat / 5);
		} else if (chanceForType < playerSkills.combat + playerSkills.magic) {
			// Use the magic pool
			cardPool = magicCards;
			// Give higher rarity cards the higher the player magic skill is.
			chanceForRarity = Math.random() * (playerSkills.magic / 5);
		} else if (
			chanceForType <
			playerSkills.combat + playerSkills.magic + playerSkills.tech
		) {
			// Use the tech pool
			cardPool = techCards;
			// Give higher rarity cards the higher the player tech skill is.
			chanceForRarity = Math.random() * (playerSkills.tech / 5);
		} else {
			// Use the stealth pool
			cardPool = stealthCards;
			// Give higher rarity cards the higher the player stealth skill is.
			chanceForRarity = Math.random() * (playerSkills.stealth / 5);
		}
		// decide on the rarity for the card.
		const raritySchedule = [0, 0.8, 0.95];
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
		const mintedCard = this.abilityCardService.mintCard(draftableCard);
		return mintedCard;
	}

}
