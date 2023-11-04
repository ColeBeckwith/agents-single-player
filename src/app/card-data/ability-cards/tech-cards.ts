import { AbilityCard } from '../ability-cards';

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
