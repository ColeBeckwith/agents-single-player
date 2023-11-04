import { Injectable } from '@angular/core';

import { AbilityCardType } from '../card-data/ability-cards';
import { BaseCharacter, baseCharacters } from '../card-data/base-characters';
import { RocXService } from '../roc-x/roc-x.service';
import { EventBusService } from './event-bus.service';

export interface PlayerCharacter {
	id: string;
	avatar: string;
	displayName: string;
	displayNameShort: string;
	stats: {
		defaultMovementPoints: number;
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
	constructor(private eventBusService: EventBusService) {
		super({
			playerCharacter: null,
			baseCharacters: baseCharacters
		});
	}

	public initializeRandomCharacter() {
		const baseCharacters: BaseCharacter[] = this.grab('baseCharacters');
		const unlockedCharacters = baseCharacters.filter(character => character.locked === false);
		const randomCharacter = unlockedCharacters[Math.floor(Math.random() * unlockedCharacters.length)]
		this.initializePlayerCharacterFromBaseCharacter(randomCharacter);
	}

	public initializePlayerCharacterFromBaseCharacter(
		baseCharacter: BaseCharacter
	) {
		if (baseCharacter.locked) {
			console.error('Locked Character Selected');
		}
		// const initialSkillPointsModifier = 3;
		const playerCharacter: PlayerCharacter = {
			id: baseCharacter.id,
			avatar: baseCharacter.avatar,
			displayName: baseCharacter.displayName,
			displayNameShort: baseCharacter.displayNameShort,
			stats: {
				defaultMovementPoints: 2,
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
				// skillPoints: {
				// 	magic:
				// 		baseCharacter.startingStats.magic *
				// 		initialSkillPointsModifier,
				// 	stealth:
				// 		baseCharacter.startingStats.stealth *
				// 		initialSkillPointsModifier,
				// 	combat:
				// 		baseCharacter.startingStats.combat *
				// 		initialSkillPointsModifier,
				// 	tech:
				// 		baseCharacter.startingStats.tech *
				// 		initialSkillPointsModifier,
				// },
				skillPoints: {
					magic: 0,
					stealth: 0,
					combat: 0,
					tech: 0
				}
			},
		};

		this.set('playerCharacter', playerCharacter);
		this.eventBusService.playerCharacterInitialized$.next({});
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

	public reduceHealth(amountToReduceHealth: number) {
		const playerCharacter: PlayerCharacter = this.grab('playerCharacter')
		playerCharacter.stats.currentHealth -= amountToReduceHealth;
		this.eventBusService.playerCharacterLostHealth$.next({});
		this.set('playerCharacter', playerCharacter);
	}
}
