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
		id: 'spark',
		title: 'Spark',
		primaryType: 'tech',
		rarity: 1,
		cost: 0,
		encounterValue: 0,
		tags: ['Fire']
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
		id: 'assembly',
		title: 'Assembly',
		primaryType: 'tech',
		rarity: 1,
		cost: 3,
		encounterValue: 0,
		consumable: true,
		consumeText: '-3 Credit cost for a random equipment in the shop.'
	},
	{
		id: 'install-daemon',
		title: 'Install Daemon',
		primaryType: 'tech',
		rarity: 1,
		cost: 1,
		encounterValue: 1,
		encounterText: 'On failure, -5 Encounter difficulty. Return this card from your discard if the encounter is successful on a subsequent attempt.',
		tags: ['Malware']
	},
	{
		id: 'install-virus',
		title: 'Install Virus',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: 1,
		encounterText: 'On failure, -12 Encounter difficulty. Return this card from your discard if the encounter is successful on a subsequent attempt.',
		tags: ['Malware']
	},
	{
		id: 'siphon',
		title: 'Siphon',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: 0,
		encounterText: 'Get Credits equal to the level of the encounter'
	},
	{
		id: 'toolkit',
		title: 'Toolkit',
		primaryType: 'tech',
		rarity: 2,
		cost: 3,
		encounterValue: 0,
		encounterText: '+1 Encounter Value for each unique piece of equipment.'
	},
	{
		id: 'trojan-horse',
		title: 'Trojan Horse',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: 3,
		encounterText: 'If you fail this encounter, reveal all squares within 5',
		tags: ['Malware']
	},
	{
		id: 'adaptive-intrusion',
		title: 'Adaptive Intrusion',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: -2,
		encounterText: 'If successful, Adapative Intrusion permanently gets +1 Encounter Value.'
	},
	{
		id: 'install-backdoor',
		title: 'Install Backdoor',
		primaryType: 'tech',
		rarity: 3,
		cost: 2,
		encounterValue: 1,
		encounterText: 'On failure, -20 Encounter difficulty. Return this card from your discard if the encounter is successful on a subsequent attempt.',
		tags: ['Malware']
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
