export type AbilityCardType = 'stealth' | 'magic' | 'tech' | 'combat';

export interface AbilityCard {
	id: string;
	title: string;
	rarity: number;
	cost: number;
	encounterValue: number;
	encounterText?: string;
	primaryType: AbilityCardType;
	secondaryTypes?: AbilityCardType[];
	consumable?: boolean;
	consumeText?: string;
	destroys?: boolean;
	// tracks which created card this was. Serves as a unique ID for each Ability Card rather than the ID which is only unique per type of card.
	mint?: number;
}

export const stealthCards: AbilityCard[] = [
	{
		id: 'sneak',
		title: 'Sneak',
		primaryType: 'stealth',
		rarity: 1,
		cost: 1,
		encounterValue: 2,
	},
	{
		id: 'hidden-blade',
		title: 'Hidden Blade',
		primaryType: 'stealth',
		secondaryTypes: ['combat'],
		rarity: 1,
		cost: 2,
		encounterValue: 2,
	},
	{
		id: 'silencer',
		title: 'Silencer',
		primaryType: 'stealth',
		rarity: 2,
		cost: 2,
		encounterValue: 0,
		encounterText: 'Negates negative alert level effects.',
	},
	{
		id: 'lightfooted',
		title: 'Light Footed',
		primaryType: 'stealth',
		rarity: 2,
		cost: 1,
		encounterValue: 4,
		encounterText: 'Loses 1 Encounter Value for each equipment carried',
	},
	{
		id: 'recon',
		title: 'Recon',
		primaryType: 'stealth',
		rarity: 3,
		cost: 2,
		encounterValue: 2,
		consumable: true,
		consumeText: 'Reveal all squares within 4 spaces.',
	},
	{
		id: 'assassinate',
		title: 'Assassinate',
		primaryType: 'stealth',
		rarity: 3,
		cost: 4,
		encounterValue: 15,
		destroys: true,
	},
];

export const combatCards: AbilityCard[] = [
	{
		id: 'aimed-shot',
		title: 'Aimed Shot',
		primaryType: 'combat',
		rarity: 1,
		cost: 1,
		encounterValue: 2,
	},
	{
		id: 'observe-tactics',
		title: 'Observe Tactics',
		primaryType: 'combat',
		rarity: 1,
		cost: 1,
		encounterValue: -1,
		encounterText: '+2 Combat Skill Points'
	},
	{
		id: 'charge',
		title: 'Charge',
		primaryType: 'combat',
		rarity: 1,
		cost: 2,
		encounterValue: 1,
		consumable: true,
		consumeText: 'Movement +2',
	},
	{
		id: 'improvised-weapon',
		title: 'Improvised Weapon',
		primaryType: 'combat',
		rarity: 1,
		cost: 2,
		encounterValue: 3,
		encounterText: 'Encounter Value is reduced by 2 each time it is used.',
	},
	{
		id: 'mag-dump',
		title: 'Mag Dump',
		primaryType: 'combat',
		rarity: 1,
		cost: 1,
		encounterValue: 4,
		encounterText: 'Cannot be played with any other Combat Type cards.',
	},
	{
		id: 'surpression',
		title: 'Supression',
		primaryType: 'combat',
		rarity: 1,
		cost: 2,
		encounterValue: 1,
		encounterText:
			'If total encounter value is within 4 of required value, ignore any negative health effects from the encounter card.',
	},
	{
		id: 'improvised-explosive',
		title: 'Improvised Explosive',
		primaryType: 'combat',
		rarity: 2,
		cost: 2,
		encounterValue: 5,
		encounterText: 'You must discard 1 ability card in order to play this.',
	},
	{
		id: 'grenade',
		title: 'Grenade',
		primaryType: 'combat',
		rarity: 2,
		cost: 2,
		encounterValue: 6,
		encounterText: 'Alert Level +1.',
	},
	{
		id: 'berserk',
		title: 'Berserk',
		primaryType: 'combat',
		rarity: 3,
		cost: 1,
		encounterValue: 5,
		encounterText: 'Health -1.',
	},
	{
		id: 'tend-wounds',
		title: 'Tend Wounds',
		primaryType: 'combat',
		rarity: 3,
		cost: 2,
		encounterValue: -2,
		encounterText: 'Health +3.',
	},
	{
		id: 'departing-gift',
		title: 'Departing Gift',
		primaryType: 'combat',
		rarity: 3,
		cost: 3,
		encounterValue: 10,
		encounterText: 'You must destroy 1 ability card in order to play this.',
	},
];

export const magicCards: AbilityCard[] = [
	{
		id: 'flicker',
		title: 'Flicker',
		primaryType: 'magic',
		rarity: 1,
		cost: 1,
		encounterValue: 1,
	},
	{
		id: 'slow',
		title: 'Slow',
		primaryType: 'magic',
		rarity: 1,
		cost: 1,
		encounterValue: -1,
		encounterText: 'If encounter is successful, return 1 other played card back to your deck.'
	},
	{
		id: 'sapling-of-life',
		title: 'Sapling of Life',
		primaryType: 'magic',
		rarity: 1,
		cost: 2,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Health +1'
	},
	{
		id: 'transmute',
		title: 'Transmute',
		primaryType: 'magic',
		rarity: 1,
		cost: 1,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Change the current encounter to a different encounter of the same difficulty.'
	},
	{
		id: 'branch-of-life',
		title: 'Branch of Life',
		primaryType: 'magic',
		rarity: 2,
		cost: 3,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Health +4'
	},
	{
		id: 'flame',
		title: 'Flame',
		primaryType: 'magic',
		rarity: 2,
		cost: 2,
		encounterValue: 5,
	},
	{
		id: 'reverse-metamorphosis',
		title: 'Reverse Metamorphosis',
		primaryType: 'magic',
		rarity: 2,
		cost: 2,
		encounterValue: 1,
		consumable: true,
		consumeText: 'Change the current encounter a different encounter of a lower difficulty.'
	},
	{
		id: 'stop',
		title: 'Stop',
		primaryType: 'magic',
		rarity: 2,
		cost: 3,
		encounterValue: -2,
		encounterText: 'If encounter is successful, return 2 other played cards back to your deck.'
	},
	{
		id: 'summoning-ritual',
		title: 'Summoning Ritual',
		primaryType: 'magic',
		rarity: 3,
		cost: 1,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Change the current encounter to an encounter for which Magic is a Strong Type.'
	},
	{
		id: 'teleport',
		title: 'Teleport',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: 1,
		consumable: true,
		consumeText: 'Move to any discovered square',
	},
	{
		id: 'blaze',
		title: 'Blaze',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: 10,
	},
	{
		id: 'rewind',
		title: 'Rewind',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: -6,
		encounterText:
			'After resolving the encounter, return all other cards played on this encounter into your inventory. Only one Rewind may be played per encounter.',
	},
	{
		id: 'inferno',
		title: 'Inferno',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: 15,
		encounterText: 'Health -2',
	},
	{
		id: 'tree-of-life',
		title: 'Tree of Life',
		primaryType: 'magic',
		rarity: 3,
		cost: 5,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Health +7',
	},
];

export const techCards: AbilityCard[] = [
	{
		id: 'hack',
		title: 'Hack',
		primaryType: 'tech',
		rarity: 1,
		cost: 1,
		encounterValue: 1,
	},
	{
		id: 'sonar',
		title: 'Sonar',
		primaryType: 'tech',
		rarity: 1,
		cost: 2,
		encounterValue: 1,
		consumable: true,
		consumeText: 'Reveal all squares within 3 spaces',
	},
	{
		id: 'trojan-horse',
		title: 'Trojan Horse',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: 3,
		encounterText:
			'If you fail this encounter, reveal all squares within 5',
	},
	{
		id: 'adaptive-intrusion',
		title: 'Adaptive Intrusion',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: -2,
		encounterText:
			'If successful, Adapative Intrusion permanently gets +1 Encounter Value.',
	},
	{
		id: 'x-ray-vision',
		title: 'X-Ray Vision',
		primaryType: 'tech',
		rarity: 3,
		cost: 3,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Reveal all squares in a straight line',
	},
];
