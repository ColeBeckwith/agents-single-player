import { AbilityCard, AbilityCardId } from '../ability-cards';

export const magicCards: AbilityCard[] = [
	{
		id: AbilityCardId.FLICKER,
		title: 'Flicker',
		primaryType: 'magic',
		rarity: 1,
		cost: 1,
		encounterValue: 1,
		tags: ['Fire']
	},
	{
		id: AbilityCardId.SLOW,
		title: 'Slow',
		primaryType: 'magic',
		rarity: 1,
		cost: 1,
		encounterValue: -1,
		encounterText: 'If encounter is successful, return 1 other played card back to your deck.',
		tags: ['Time']
	},
	{
		id: AbilityCardId.SEED_OF_LIFE,
		title: 'Seed of Life',
		primaryType: 'magic',
		rarity: 1,
		cost: 2,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Health +1',
		tags: ['Healing']
	},
	{
		id: AbilityCardId.TRANSMUTE,
		title: 'Transmute',
		primaryType: 'magic',
		rarity: 1,
		cost: 1,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Change the current encounter to a different encounter of the same difficulty.',
		tags: ['Transform']
	},
	{
		id: AbilityCardId.BRANCH_OF_LIFE,
		title: 'Branch of Life',
		primaryType: 'magic',
		rarity: 2,
		cost: 3,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Health +4',
		tags: ['Healing']
	},
	{
		id: AbilityCardId.FLAME,
		title: 'Flame',
		primaryType: 'magic',
		rarity: 2,
		cost: 2,
		encounterValue: 5,
		tags: ['Fire']
	},
	{
		id: AbilityCardId.REVERSE_METAMORPHOSIS,
		title: 'Reverse Metamorphosis',
		primaryType: 'magic',
		rarity: 2,
		cost: 2,
		encounterValue: 1,
		consumable: true,
		consumeText: 'Change the current encounter a different encounter of a lower difficulty.',
		tags: ['Time']
	},
	{
		id: AbilityCardId.STOP,
		title: 'Stop',
		primaryType: 'magic',
		rarity: 2,
		cost: 3,
		encounterValue: -2,
		encounterText: 'If encounter is successful, return 2 other played cards back to your deck.',
		tags: ['Time']
	},
	{
		id: AbilityCardId.SUMMONING_RITUAL,
		title: 'Summoning Ritual',
		primaryType: 'magic',
		rarity: 3,
		cost: 1,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Change the current encounter to an encounter for which Magic is a Strong Type.'
	},
	{
		id: AbilityCardId.TELEPORT,
		title: 'Teleport',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: 1,
		consumable: true,
		consumeText: 'Move to any discovered square',
	},
	{
		id: AbilityCardId.BLAZE,
		title: 'Blaze',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: 10,
		tags: ['Fire']
	},
	{
		id: AbilityCardId.REWIND,
		title: 'Rewind',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: -6,
		encounterText:
			'After resolving the encounter, return all other cards played on this encounter into your inventory. Only one Rewind may be played per encounter.',
	},
	{
		id: AbilityCardId.INFERNO,
		title: 'Inferno',
		primaryType: 'magic',
		rarity: 3,
		cost: 3,
		encounterValue: 15,
		encounterText: 'Health -2',
		tags: ['Fire']
	},
	{
		id: AbilityCardId.TREE_OF_LIFE,
		title: 'Tree of Life',
		primaryType: 'magic',
		rarity: 3,
		cost: 5,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Health +7',
		tags: ['Healing']
	},
];