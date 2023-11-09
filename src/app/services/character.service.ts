import { Injectable } from '@angular/core';

import { combineLatest, Observable } from 'rxjs';

import { AbilityCardType } from '../card-data/ability-cards';
import { BaseCharacter, baseCharacters } from '../card-data/base-characters';
import { RocXService } from '../roc-x/roc-x.service';
import { EventBusService } from './event-bus.service';

export interface PlayerCharacter {
	id: string;
	avatar: string;
	displayName: string;
	displayNameShort: string;
}

export interface AbilityStats {
	magic: number;
	stealth: number;
	tech: number;
	combat: number;
}

@Injectable({
	providedIn: 'root',
})
export class CharacterService extends RocXService {
	constructor(private eventBusService: EventBusService) {
		super({
			playerCharacter: null,
			baseCharacters: baseCharacters,
			defaultMovementPoints: null,
			maxHealth: null,
			currentHealth: null,
			playerLevel: null,
			experience: null,
			credits: null,
			magicStat: null,
			stealthStat: null,
			combatStat: null,
			techStat: null,
			magicPoints: null,
			stealthPoints: null,
			combatPoints: null,
			techPoints: null,
		});
	}

	public initializeRandomCharacter() {
		const baseCharacters: BaseCharacter[] = this.grab('baseCharacters');
		const unlockedCharacters = baseCharacters.filter((character) => character.locked === false);
		const randomCharacter = unlockedCharacters[Math.floor(Math.random() * unlockedCharacters.length)];
		this.initializePlayerCharacterFromBaseCharacter(randomCharacter);
	}

	public initializePlayerCharacterFromBaseCharacter(baseCharacter: BaseCharacter) {
		if (baseCharacter.locked) {
			console.error('Locked Character Selected');
		}

		const playerCharacter: PlayerCharacter = {
			id: baseCharacter.id,
			avatar: baseCharacter.avatar,
			displayName: baseCharacter.displayName,
			displayNameShort: baseCharacter.displayNameShort,
		};

		this.set('experience', 0);
		this.set('playerLevel', 1);
		this.set('playerCharacter', playerCharacter);
		this.set('defaultMovementPoints', 2);
		this.set('maxHealth', baseCharacter.startingStats.health);
		this.set('currentHealth', baseCharacter.startingStats.health);
		this.set('credits', baseCharacter.startingStats.credits);
		this.set('magicStat', baseCharacter.startingStats.magic);
		this.set('combatStat', baseCharacter.startingStats.combat);
		this.set('stealthStat', baseCharacter.startingStats.stealth);
		this.set('techStat', baseCharacter.startingStats.tech);
		this.set('magicPoints', 0);
		this.set('techPoints', 0);
		this.set('combatPoints', 0);
		this.set('stealthPoints', 0);
		this.eventBusService.playerCharacterInitialized$.next({});
	}

	public grabAbilityStats(): AbilityStats {
		return {
			magic: this.grab('magicStat'),
			tech: this.grab('techStat'),
			combat: this.grab('combatStat'),
			stealth: this.grab('stealthStat')
		}
	}

	public listenToPlayerSkillPoints(): Observable<AbilityStats> {
		return combineLatest({
			magic: this.listen('magicPoints'),
			tech: this.listen('techPoints'),
			combat: this.listen('combatPoints'),
			stealth: this.listen('stealthPoints'),
		});
	}

	public adjustCredits(value: number) {
		let credits: number = this.grab('credits');
		credits += value;
		this.set('credits', credits);
	}

	public adjustSkillPoints(type: AbilityCardType, adjustment: number) {
		const pointsProperty = this.abilityCardTypeToPointProperty[type];
		const points: number = this.grab(pointsProperty);
		let modifiedPoints = points + adjustment;
		modifiedPoints = Math.max(modifiedPoints, 0);
		this.set(pointsProperty, modifiedPoints);
	}

	public adjustAbilityStat(type: AbilityCardType, adjustment: number) {
		const statProperty = this.abilityCardTypeToStatProperty[type];
		const stat: number = this.grab(statProperty);
		let modifiedStat = stat + adjustment;
		modifiedStat = Math.max(modifiedStat, 0);
		this.set(statProperty, modifiedStat);
	}

	public grabPointsByType(type: AbilityCardType) {
		return this.grab(this.abilityCardTypeToPointProperty[type]);
	}

	public increaseHealth(amountToIncreaseHealth: number) {
		let currentHealth: number = this.grab('currentHealth');
		currentHealth += amountToIncreaseHealth;
		currentHealth = Math.min(currentHealth, this.grab('maxHealth'));
		this.set('currentHealth', currentHealth);
	}

	public reduceHealth(amountToReduceHealth: number) {
		if (amountToReduceHealth < 0) {
			console.error('Amount to reduce health should always be a positive number');
		}
		let currentHealth: number = this.grab('currentHealth');
		currentHealth -= amountToReduceHealth;
		if (currentHealth > 0) {
			this.eventBusService.playerCharacterLostHealth$.next({});
			this.set('currentHealth', currentHealth);
		} else {
			this.eventBusService.playerCharacterLostHealth$.next({});
			this.set('currentHealth', 0);
			this.eventBusService.playerDied$.next({});
		}
	}

	public modifyMaxHealth(amountToModifyHealth: number) {
		let maxHealth = this.grab('maxHealth');
		let currentHealth = this.grab('currentHealth');
		maxHealth += amountToModifyHealth;
		// If max health is being increased, give the boost to the current health too.
		if (amountToModifyHealth > 0) {
			currentHealth += amountToModifyHealth;
		}
		// If the current health is now above the max health. Reduce the current health to the max health.
		if (currentHealth > maxHealth) {
			this.set('currentHealth', maxHealth);
		}
		// If the max health is less than or equal to zero. the player is dead.
		if (maxHealth <= 0) {
			this.eventBusService.playerDied$.next({});
		}
		this.set('currentHealth', currentHealth);
		this.set('maxHealth', maxHealth);
	}

	public modifyDefaultMovementPoints(amountToModifyMovementPoints: number) {
		let defaultMovementPoints = this.grab('defaultMovementPoints');
		defaultMovementPoints += amountToModifyMovementPoints;
		this.set('defaultMovementPoints', defaultMovementPoints);
	}

	private abilityCardTypeToPointProperty = {
		magic: 'magicPoints',
		tech: 'techPoints',
		combat: 'combatPoints',
		stealth: 'stealthPoints',
	};

	private abilityCardTypeToStatProperty = {
		magic: 'magicStat',
		tech: 'techStat',
		combat: 'combatStat',
		stealth: 'stealthStat'
	}
}
