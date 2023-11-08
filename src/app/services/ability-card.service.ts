import { Injectable } from '@angular/core';

import { AbilityCard } from '../card-data/ability-cards';
import { BaseCharacter } from '../card-data/base-characters';
import { RocXService } from '../roc-x/roc-x.service';
import { arrayShuffle } from '../utils/array-shuffle';
import { deepClone } from '../utils/deep-clone';
import { CharacterService } from './character.service';
import { EventBusService } from './event-bus.service';

@Injectable({
	providedIn: 'root',
})
export class AbilityCardService extends RocXService {
	private mint = 1;

	constructor(private eventBusService: EventBusService, private characterService: CharacterService) {
		super({
			abilityCardDraw: [],
			abilityCardDiscard: [],
			encounterStage: [],
		});
		this.eventBusService.playerCharacterInitialized$.subscribe(() => {
			this.mintStartingDeck();
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

	public addAbilityCardToDeck(abilityCard: AbilityCard) {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		abilityCardDraw.push(abilityCard);
		this.set('abilityCardDraw', abilityCardDraw);
	}

	public discardAbilityCard(abilityCardToDiscard: AbilityCard) {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		const abilityCardDiscard: AbilityCard[] = this.grab('abilityCardDiscard');
		const indexOfCardToDiscard = abilityCardDraw.findIndex((abilityCardInDraw) => abilityCardInDraw.mint === abilityCardToDiscard.mint);
		if (indexOfCardToDiscard !== -1) {
			abilityCardDraw.splice(indexOfCardToDiscard, 1);
			abilityCardDiscard.push(abilityCardToDiscard);
			this.set('abilityCardDraw', abilityCardDraw);
			this.set('abilityCardDiscard', abilityCardDiscard);
		}
	}

	public moveCardFromDrawToEncounterStage(abilityCardToMove: AbilityCard, indexToInsert?: number) {
		const drawPile: AbilityCard[] = this.grab('abilityCardDraw');
		const cardToMove = drawPile.find((abilityCardInDrawPile) => abilityCardInDrawPile.mint === abilityCardToMove.mint);
		if (cardToMove) {
			const indexInDrawPile = drawPile.indexOf(cardToMove);
			drawPile.splice(indexInDrawPile, 1);
			this.set('abilityCardDraw', drawPile);
			const encounterStage = this.grab('encounterStage');
			if (indexToInsert) {
				encounterStage.splice(indexToInsert, 0, cardToMove);
			} else {
				// default behavior is to add to the end.
				encounterStage.push(cardToMove);
			}
			this.set('encounterStage', encounterStage);
		}
	}

	public moveCardFromEncounterStageToDraw(abilityCardToMove: AbilityCard, indexToInsert?: number) {
		const encounterStage: AbilityCard[] = this.grab('encounterStage');
		const cardToMove = encounterStage.find((abilityCardInEncounterStage) => abilityCardInEncounterStage.mint === abilityCardToMove.mint);
		if (cardToMove) {
			const indexInDrawPile = encounterStage.indexOf(cardToMove);
			encounterStage.splice(indexInDrawPile, 1);
			this.set('encounterStage', encounterStage);
			const abilityCardDraw = this.grab('abilityCardDraw');
			if (indexToInsert) {
				abilityCardDraw.splice(indexToInsert, 0, cardToMove);
			} else {
				// Default behavior is to add to the end.
				abilityCardDraw.push(cardToMove);
			}
			this.set('abilityCardDraw', abilityCardDraw);
		}
	}

	public drawAbilityCardFromDiscard(abilityCardToDraw: AbilityCard) {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		const abilityCardDiscard: AbilityCard[] = this.grab('abilityCardDiscard');
		const indexOfCardToDraw = abilityCardDiscard.findIndex((abilityCardInDiscard) => abilityCardInDiscard.mint === abilityCardToDraw.mint);
		if (indexOfCardToDraw !== -1) {
			abilityCardDiscard.splice(indexOfCardToDraw, 1);
			abilityCardDraw.push(abilityCardToDraw);
			this.set('abilityCardDraw', abilityCardDraw);
			this.set('abilityCardDiscard', abilityCardDiscard);
		}
	}

	public removeAbilityCardFromDeck(abilityCardToRemove: AbilityCard) {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		const indexOfCard = abilityCardDraw.findIndex((abilityCardInDraw) => abilityCardInDraw.mint === abilityCardToRemove.mint);
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
		const matchingBaseCharacter = <BaseCharacter>baseCharacters.find((baseCharacter) => baseCharacter.id === playerCharacter.id);
		const baseCharacterStartingDeck = matchingBaseCharacter.startingDeck;
		const mintedDeck = baseCharacterStartingDeck.map((card) => this.mintCard(card));
		this.set('abilityCardDiscard', []);
		this.set('abilityCardDraw', mintedDeck);
	}
}
