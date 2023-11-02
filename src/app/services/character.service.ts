import { Injectable } from '@angular/core';

import { AbilityCard, AbilityCardType } from '../card-data/ability-cards';
import { BaseCharacter, baseCharacters } from '../card-data/base-characters';
import { RocXService } from '../roc-x/roc-x.service';
import { arrayShuffle } from '../utils/array-shuffle';

export interface PlayerCharacter {
	id: string;
	avatar: string;
	displayName: string;
	displayNameShort: string;
	stats: {
		maxHealth: number;
		currentHealth: number;
		credits: number;
		level: number;
		experience: number;
		skills: {
			magic: number;
			stealth: number;
			combat: number;
			tech: number;
		};
		skillPoints: {
			magic: number;
			stealth: number;
			combat: number;
			tech: number;
		};
	};
}

@Injectable({
	providedIn: 'root',
})
export class CharacterService extends RocXService {
	constructor() {
		super({
			playerCharacter: null,
			baseCharacters: baseCharacters,
			abilityCardDraw: [],
			abilityCardDiscard: [],
		});
	}

	public initializePlayerCharacterFromBaseCharacter(
		baseCharacter: BaseCharacter
	) {
		const initialSkillPointsModifier = 3;
		const playerCharacter: PlayerCharacter = {
			id: baseCharacter.id,
			avatar: baseCharacter.avatar,
			displayName: baseCharacter.displayName,
			displayNameShort: baseCharacter.displayNameShort,
			stats: {
				maxHealth: baseCharacter.startingStats.health,
				currentHealth: baseCharacter.startingStats.health,
				credits: baseCharacter.startingStats.credits,
				level: 1,
				experience: 0,
				skills: {
					magic: baseCharacter.startingStats.magic,
					stealth: baseCharacter.startingStats.stealth,
					combat: baseCharacter.startingStats.combat,
					tech: baseCharacter.startingStats.tech,
				},
				skillPoints: {
					magic:
						baseCharacter.startingStats.magic *
						initialSkillPointsModifier,
					stealth:
						baseCharacter.startingStats.stealth *
						initialSkillPointsModifier,
					combat:
						baseCharacter.startingStats.combat *
						initialSkillPointsModifier,
					tech:
						baseCharacter.startingStats.tech *
						initialSkillPointsModifier,
				},
			},
		};

		this.set('playerCharacter', playerCharacter);
		return playerCharacter;
	}

	public adjustCredits(value: number) {
		const playerCharacter: PlayerCharacter = this.grab('playerCharacter');
		playerCharacter.stats.credits += value;
		this.set('playerCharacter', playerCharacter);
	}

	public adjustSkillPoints(type: AbilityCardType, value: number) {
		const playerCharacter: PlayerCharacter = this.grab('playerCharacter');
		playerCharacter.stats.skillPoints[type] += value;
		this.set('playerCharacter', playerCharacter);
	}

	public addAbilityCardToDeck(abilityCard: AbilityCard) {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		abilityCardDraw.push(abilityCard);
		this.set('abilityCardDraw', abilityCardDraw);
	}

	public discardAbilityCard(abilityCardToDiscard: AbilityCard) {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		const abilityCardDiscard: AbilityCard[] =
			this.grab('abilityCardDiscard');
		const indexOfCardToDiscard = abilityCardDraw.findIndex(
			(abilityCardInDraw) =>
				abilityCardInDraw.mint === abilityCardToDiscard.mint
		);
		if (indexOfCardToDiscard !== -1) {
			abilityCardDraw.splice(indexOfCardToDiscard, 1);
			abilityCardDiscard.push(abilityCardToDiscard);
			this.set('abilityCardDraw', abilityCardDraw);
			this.set('abilityCardDiscard', abilityCardDiscard);
		}
	}

	public drawAbilityCardFromDiscard(abilityCardToDraw: AbilityCard) {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		const abilityCardDiscard: AbilityCard[] =
			this.grab('abilityCardDiscard');
		const indexOfCardToDraw = abilityCardDiscard.findIndex(
			(abilityCardInDiscard) =>
				abilityCardInDiscard.mint === abilityCardToDraw.mint
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
			(abilityCardInDraw) =>
				abilityCardInDraw.mint === abilityCardToRemove.mint
		);
		abilityCardDraw.splice(indexOfCard, 1);
		this.set('abilityCardDraw', abilityCardDraw);
	}

	public shuffleAbilityCardDraw() {
		const abilityCardDraw: AbilityCard[] = this.grab('abilityCardDraw');
		arrayShuffle(abilityCardDraw);
		this.set('abilityCardDraw', abilityCardDraw);
	}
}
