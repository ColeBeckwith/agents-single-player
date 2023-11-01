export type AbilityCardType = 'stealth' | 'magic' | 'tech' | 'combat'

export interface AbilityCard {
	id: string;
	title: string;
	rarity: number;
	cost: number;
	encounterValue: number;
	encounterText?: string;
	primaryType: AbilityCardType;
	secondaryType?: AbilityCardType;
	consumable?: boolean;
	consumeText?: string;
}

export const stealthCards: AbilityCard[] = [
	{
		id: 'sneak',
		title: 'Sneak',
		primaryType: 'stealth',
		rarity: 1,
		cost: 1,
		encounterValue: 2
	},
	{
		id: 'hidden-blade',
		title: 'Hidden Blade',
		primaryType: 'stealth',
		secondaryType: 'combat',
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
		encounterText: 'Loses 1 Encounter Value for each equipment carried'
	},
	{
		id: 'recon',
		title: 'Recon',
		primaryType: 'stealth',
		rarity: 3,
		cost: 2,
		encounterValue: 2,
		consumable: true,
		consumeText: 'Reveal all squares within 4 spaces.'
	}
];

export const combatCards: AbilityCard[] = [
	{
		id: 'aimed-shot',
		title: 'Aimed Shot',
		primaryType: 'combat',
		rarity: 1,
		cost: 1,
		encounterValue: 2
	},
	{
		id: 'mag-dump',
		title: 'Mag Dump',
		primaryType: 'combat',
		rarity: 1,
		cost: 1,
		encounterValue: 4,
		encounterText: 'Cannot be played with any other Combat Type (Primary) cards'
	},
	{
		id: 'grenade',
		title: 'Grenade',
		primaryType: 'combat',
		rarity: 2,
		cost: 2,
		encounterValue: 6,
		encounterText: 'Alert Level +1'
	},
	{
		id: 'berserk',
		title: 'Berserk',
		primaryType: 'combat',
		rarity: 3,
		cost: 1,
		encounterValue: 5,
		encounterText: 'Health -1'
	},
	{
		id: 'tend-wounds',
		title: 'Tend Wounds',
		primaryType: 'combat',
		rarity: 3,
		cost: 2,
		encounterValue: -2,
		encounterText: 'Health +3'
	}
];

export const magicCards: AbilityCard[] = [
	{
		id: 'flicker',
		title: 'Flicker',
		primaryType: 'magic',
		rarity: 1,
		cost: 1,
		encounterValue: 1
	},
	{
		id: 'flame',
		title: 'Flame',
		primaryType: 'magic',
		rarity: 2,
		cost: 2,
		encounterValue: 5
	},
	{
		id: 'teleport',
		title: 'Teleport',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: 1,
		consumable: true,
		consumeText: 'Move to any discovered square'
	},
	{
		id: 'blaze',
		title: 'Blaze',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: 10
	},
	{
		id: 'rewind',
		title: 'Rewind',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: -6,
		encounterText: 'After resolving the encounter, return all other cards played on this encounter into your inventory. Only one Rewind may be played per encounter.'
	},
	{
		id: 'inferno',
		title: 'Inferno',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: 15,
		encounterText: 'Health -2'
	}
];

export const techCards: AbilityCard[] = [
	{
		id: 'hack',
		title: 'Hack',
		primaryType: 'tech',
		rarity: 1,
		cost: 1,
		encounterValue: 1
	},
	{
		id: 'sonar',
		title: 'Sonar',
		primaryType: 'tech',
		rarity: 1,
		cost: 2,
		encounterValue: 1,
		consumable: true,
		consumeText: 'Reveal all squares within 3 spaces'
	},
	{
		id: 'trojan-horse',
		title: 'Trojan Horse',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: 3,
		encounterText: 'If you fail this encounter, reveal all squares within 5'
	},
	{
		id: 'adaptive-intrusion',
		title: 'Adaptive Intrusion',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: -2,
		encounterText: 'If succesful, Adapative Intrusion permanently gets +1 Encounter Value.'
	},
	{
		id: 'x-ray-vision',
		title: 'X-Ray Vision',
		primaryType: 'tech',
		rarity: 2,
		cost: 3,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Reveal all squares in a straight line'
	}

]