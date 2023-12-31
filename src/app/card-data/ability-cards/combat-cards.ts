import { AbilityCard, AbilityCardId } from '../ability-cards';

export const combatCards: AbilityCard[] = [
	{
		id: AbilityCardId.AIMED_SHOT,
		title: 'Aimed Shot',
		primaryType: 'combat',
		rarity: 1,
		cost: 1,
		encounterValue: 2,
	},
	{
		id: AbilityCardId.AKIMBO,
		title: 'Akimbo',
		primaryType: 'combat',
		cost: 1,
		rarity: 1,
		encounterValue: 1,
		encounterText: 'Encounter Value is doubled if played with exactly one other Akimbo.'
	},
	{
		id: AbilityCardId.OBSERVE_TACTICS,
		title: 'Observe Tactics',
		primaryType: 'combat',
		rarity: 1,
		cost: 1,
		encounterValue: -1,
		encounterText: '+2 Combat Skill Points',
	},
	{
		id: AbilityCardId.CHARGE,
		title: 'Charge',
		primaryType: 'combat',
		rarity: 1,
		cost: 2,
		encounterValue: 1,
		consumable: true,
		consumeText: 'Movement +2',
	},
	{
		id: AbilityCardId.IMPROVISED_WEAPON,
		title: 'Improvised Weapon',
		primaryType: 'combat',
		rarity: 1,
		cost: 2,
		encounterValue: 3,
		encounterText: 'Encounter Value is reduced by 2 each time it is used.',
	},
	{
		id: AbilityCardId.MAG_DUMP,
		title: 'Mag Dump',
		primaryType: 'combat',
		rarity: 1,
		cost: 1,
		encounterValue: 4,
		encounterText: 'Cannot be played with any other Combat Type cards.',
	},
	{
		id: AbilityCardId.SUPRESSION,
		title: 'Suppression',
		primaryType: 'combat',
		rarity: 1,
		cost: 2,
		encounterValue: 1,
		encounterText: 'If total encounter value is within 4 of required value, ignore any negative health effects from the encounter card.',
	},
	{
		id: AbilityCardId.MOMENTUM,
		title: 'Momentum',
		primaryType: 'combat',
		rarity: 2,
		cost: 2,
		encounterValue: 0,
		encounterText: '+1 Encounter Value for each other card played in this enounter. Creates a copy of itself '
	},
	{
		id: AbilityCardId.FLAMETHROWER,
		title: 'Flamethrower',
		primaryType: 'combat',
		rarity: 2,
		cost: 2,
		encounterValue: 2,
		tags: ['Fire'],
	},
	{
		id: AbilityCardId.IMPROVISED_EXPLOSIVE,
		title: 'Improvised Explosive',
		primaryType: 'combat',
		rarity: 2,
		cost: 2,
		encounterValue: 5,
		encounterText: 'You must discard 1 ability card in order to play this.',
	},
	{
		id: AbilityCardId.GRENADE,
		title: 'Grenade',
		primaryType: 'combat',
		rarity: 2,
		cost: 2,
		encounterValue: 6,
		encounterText: 'Alert Level +1.',
	},
	{
		id: AbilityCardId.BERSERK,
		title: 'Berserk',
		primaryType: 'combat',
		rarity: 3,
		cost: 1,
		encounterValue: 5,
		encounterText: 'Health -1.',
	},
	{
		id: AbilityCardId.TEND_WOUNDS,
		title: 'Tend Wounds',
		primaryType: 'combat',
		rarity: 3,
		cost: 2,
		encounterValue: -2,
		encounterText: 'Health +3.',
	},
	{
		id: AbilityCardId.DEPARTING_GIFT,
		title: 'Departing Gift',
		primaryType: 'combat',
		rarity: 3,
		cost: 3,
		encounterValue: 10,
		encounterText: 'You must destroy 1 ability card in order to play this.',
	},
];
