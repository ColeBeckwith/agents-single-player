import { AbilityCard } from '../ability-cards';

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
		id: 'tiptoe',
		title: 'Tiptoe',
		primaryType: 'stealth',
		rarity: 1,
		cost: 2,
		encounterValue: 1,
		successText: 'Alert Level -1'
	},
	{
		id: 'hide',
		title: 'Hide',
		primaryType: 'stealth',
		rarity: 1,
		cost: 1,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Deactivate an encounter. +1 Stealth Skill Point. Can only be used if Stealth is strong for the Encounter.'
	},
	{
		id: 'pickpocket',
		title: 'Pickpocket',
		primaryType: 'stealth',
		rarity: 1,
		cost: 2,
		encounterValue: -1,
		successText: '+1 Credit'
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
		encounterText: '-1 Encounter Value for each equipment carried',
	},
	{
		id: 'decoy',
		title: 'Decoy',
		primaryType: 'stealth',
		rarity: 2,
		cost: 2,
		encounterValue: 2,
		consumable: true,
		consumeText: 'Deactivate an encounter. Move to an adjacent square.'
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