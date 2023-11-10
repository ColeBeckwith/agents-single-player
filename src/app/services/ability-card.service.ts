import { Injectable } from '@angular/core';

import { filter } from 'rxjs';

import { AbilityCard, AbilityCardType } from '../card-data/ability-cards';
import { BaseCharacter } from '../card-data/base-characters';
import { RocXService } from '../roc-x/roc-x.service';
import { arrayShuffle } from '../utils/array-shuffle';
import { deepClone } from '../utils/deep-clone';
import { getRandomItemFromArray } from '../utils/get-random-item-from-array';
import { CharacterService } from './character.service';
import { EventBusService } from './event-bus.service';
import { PhaseService } from './phase.service';

@Injectable({
	providedIn: 'root',
})
export class AbilityCardService extends RocXService {
	private mint = 1;

	constructor(
		private eventBusService: EventBusService,
		private characterService: CharacterService,
		private phaseService: PhaseService
	) {
		super({
			abilityCardDraw: [],
			abilityCardDiscard: [],
			encounterStage: [],
			abilityCardHand: [],
		});
		this.eventBusService.playerCharacterInitialized$.subscribe(() => {
			this.mintStartingDeck();
		});
		this.phaseService
			.listen('encounter')
			.pipe(filter(Boolean))
			.subscribe(() => {
				this.drawHandForEncounter();
			});
	}

	public mintCard(abilityCard: AbilityCard) {
		// Deep clone at this point since we are wanting the create a new version of this card.
		const mintedCard = deepClone(abilityCard);
		// Assign the mint value and increment it.
		mintedCard.mint = this.mint;
		this.mint++;
		return mintedCard;
	}

	public drawHandForEncounter() {
		const playerAbilityStats = this.characterService.grabAbilityStats();
		const cardsDrawnToHand: AbilityCard[] = [];
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		['magic', 'combat', 'stealth', 'tech'].forEach((abilityCardType) => {
			for (let i = 0; i < playerAbilityStats[<AbilityCardType>abilityCardType]; i++) {
				const cardsOfType = abilityCardDraw.filter((abilityCard) => abilityCard.primaryType === abilityCardType);
				if (cardsOfType.length > 0) {
					const randomCard = getRandomItemFromArray(cardsOfType);
					cardsDrawnToHand.push(randomCard);
					abilityCardDraw.splice(abilityCardDraw.indexOf(randomCard), 1);
				}
			}
		});

		this.set('abilityCardHand', cardsDrawnToHand);
		this.set('abilityCardDraw', abilityCardDraw);
	}

	public returnHandToDraw() {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		const abilityCardHand: AbilityCard[] = this.grab('abilityCardHand');
		this.set('abilityCardDraw', [...abilityCardDraw, ...abilityCardHand]);
		this.set('abilityCardHand', []);
	}

	public addAbilityCardToDeck(abilityCard: AbilityCard) {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		abilityCardDraw.push(abilityCard);
		this.set('abilityCardDraw', abilityCardDraw);
	}

	public discardAbilityCardFromDraw(abilityCardToDiscard: AbilityCard) {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		const abilityCardDiscard: AbilityCard[] = this.grab('abilityCardDiscard');
		const indexOfCardToDiscard = abilityCardDraw.findIndex(
			(abilityCardInDraw) => abilityCardInDraw.mint === abilityCardToDiscard.mint
		);
		if (indexOfCardToDiscard !== -1) {
			abilityCardDraw.splice(indexOfCardToDiscard, 1);
			abilityCardDiscard.push(abilityCardToDiscard);
			this.set('abilityCardDraw', abilityCardDraw);
			this.set('abilityCardDiscard', abilityCardDiscard);
		}
	}

	public discardAbilityCardFromHand(abilityCardToDiscard: AbilityCard) {
		const abilityCardHand: AbilityCard[] = this.grab('abilityCardHand');
		const abilityCardDiscard: AbilityCard[] = this.grab('abilityCardDiscard');
		const indexOfCardToDiscard = abilityCardHand.findIndex(
			(abilityCardInHand) => abilityCardInHand.mint === abilityCardToDiscard.mint
		);
		if (indexOfCardToDiscard !== -1) {
			abilityCardHand.splice(indexOfCardToDiscard, 1);
			abilityCardDiscard.push(abilityCardToDiscard);
			this.set('abilityCardHand', abilityCardHand);
			this.set('abilityCardDiscard', abilityCardDiscard);
		}
	}

	public moveCardFromHandToEncounterStage(abilityCardToMove: AbilityCard, indexToInsert?: number) {
		const hand: AbilityCard[] = this.grab('abilityCardHand');
		const cardToMove = hand.find((abilityCardInHand) => abilityCardInHand.mint === abilityCardToMove.mint);
		if (cardToMove) {
			const indexInDrawPile = hand.indexOf(cardToMove);
			hand.splice(indexInDrawPile, 1);
			this.set('abilityCardHand', hand);
			const encounterStage = this.grab('encounterStage');
			if (typeof indexToInsert === 'number') {
				encounterStage.splice(indexToInsert, 0, cardToMove);
			} else {
				// default behavior is to add to the end.
				encounterStage.push(cardToMove);
			}
			this.set('encounterStage', encounterStage);
			this.eventBusService.encounterStageCardsChanged$.next({});
		}
	}

	public moveCardFromEncounterStageToHand(abilityCardToMove: AbilityCard, indexToInsert?: number) {
		const encounterStage: AbilityCard[] = this.grab('encounterStage');
		const cardToMove = encounterStage.find(
			(abilityCardInEncounterStage) => abilityCardInEncounterStage.mint === abilityCardToMove.mint
		);
		if (cardToMove) {
			delete cardToMove.stagedValue;
			const indexInEncounterStage = encounterStage.indexOf(cardToMove);
			encounterStage.splice(indexInEncounterStage, 1);
			this.set('encounterStage', encounterStage);
			const abilityCardHand = this.grab('abilityCardHand');
			if (typeof indexToInsert === 'number') {
				abilityCardHand.splice(indexToInsert, 0, cardToMove);
			} else {
				// Default behavior is to add to the end.
				abilityCardHand.push(cardToMove);
			}
			this.set('abilityCardHand', abilityCardHand);
			this.eventBusService.encounterStageCardsChanged$.next({});
		}
	}

	public discardEncounterStage() {
		const encounterStage: AbilityCard[] = this.grab('encounterStage');
		const abilityCardDiscard: AbilityCard[] = this.grab('abilityCardDiscard');
		encounterStage.forEach((stagedCard) => {
			delete stagedCard.stagedValue;
		});
		abilityCardDiscard.push(...encounterStage);
		this.set('encounterStage', []);
		this.set('abilityCardDiscard', abilityCardDiscard);
		this.eventBusService.encounterStageCardsChanged$.next({});
	}

	public drawAbilityCardFromDiscard(abilityCardToDraw: AbilityCard) {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		const abilityCardDiscard: AbilityCard[] = this.grab('abilityCardDiscard');
		const indexOfCardToDraw = abilityCardDiscard.findIndex(
			(abilityCardInDiscard) => abilityCardInDiscard.mint === abilityCardToDraw.mint
		);
		if (indexOfCardToDraw !== -1) {
			abilityCardDiscard.splice(indexOfCardToDraw, 1);
			abilityCardDraw.push(abilityCardToDraw);
			this.set('abilityCardDraw', abilityCardDraw);
			this.set('abilityCardDiscard', abilityCardDiscard);
		}
	}

	public removeAbilityCardFromDeck(abilityCardToRemove: AbilityCard) {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		const indexOfCard = abilityCardDraw.findIndex(
			(abilityCardInDraw) => abilityCardInDraw.mint === abilityCardToRemove.mint
		);
		abilityCardDraw.splice(indexOfCard, 1);
		this.set('abilityCardDraw', abilityCardDraw);
	}

	public shuffleAbilityCardDraw() {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		arrayShuffle(abilityCardDraw);
		this.set('abilityCardDraw', abilityCardDraw);
	}

	private mintStartingDeck() {
		const playerCharacter = this.characterService.grab('playerCharacter');
		const baseCharacters: BaseCharacter[] = this.characterService.grab('baseCharacters');
		const matchingBaseCharacter = <BaseCharacter>(
			baseCharacters.find((baseCharacter) => baseCharacter.id === playerCharacter.id)
		);
		const baseCharacterStartingDeck = matchingBaseCharacter.startingDeck;
		const mintedDeck = baseCharacterStartingDeck.map((card) => this.mintCard(card));
		this.set('abilityCardDiscard', []);
		this.set('abilityCardDraw', mintedDeck);
	}
}
