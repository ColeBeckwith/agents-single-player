import { Injectable } from '@angular/core';

import { BaseCharacter, baseCharacters } from '../card-data/base-characters';
import { RocXService } from '../roc-x/roc-x.service';

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
		}
	};
}

@Injectable({
	providedIn: 'root',
})
export class CharacterService extends RocXService {
	constructor() {
		super({ playerCharacter: null, baseCharacters: baseCharacters });
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
					magic: baseCharacter.startingStats.magic * initialSkillPointsModifier,
					stealth: baseCharacter.startingStats.stealth * initialSkillPointsModifier,
					combat: baseCharacter.startingStats.combat * initialSkillPointsModifier,
					tech: baseCharacter.startingStats.tech * initialSkillPointsModifier,
				}
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
}
