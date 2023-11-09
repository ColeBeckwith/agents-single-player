import { AbilityCard, AbilityCardId } from '../ability-cards';

export const techCards: AbilityCard[] = [
	{
		id: AbilityCardId.HACK,
		title: 'Hack',
		primaryType: 'tech',
		rarity: 1,
		cost: 1,
		encounterValue: 1,
	},
	{
		id: AbilityCardId.SPARK,
		title: 'Spark',
		primaryType: 'tech',
		rarity: 1,
		cost: 0,
		encounterValue: 0,
		tags: ['Fire']
	},
	{
		id: AbilityCardId.SONAR,
		title: 'Sonar',
		primaryType: 'tech',
		rarity: 1,
		cost: 2,
		encounterValue: 1,
		consumable: true,
		consumeText: 'Reveal all squares within 3 spaces',
	},
	{
		id: AbilityCardId.ASSEMBLY,
		title: 'Assembly',
		primaryType: 'tech',
		rarity: 1,
		cost: 3,
		encounterValue: 0,
		consumable: true,
		consumeText: '-3 Credit cost for a random equipment in the shop.'
	},
	{
		id: AbilityCardId.INSTALL_DAEMON,
		title: 'Install Daemon',
		primaryType: 'tech',
		rarity: 1,
		cost: 1,
		encounterValue: 1,
		encounterText: 'On failure, -5 Encounter difficulty. Return this card from your discard if the encounter is successful on a subsequent attempt.',
		tags: ['Malware']
	},
	{
		id: AbilityCardId.INSTALL_VIRUS,
		title: 'Install Virus',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: 1,
		encounterText: 'On failure, -12 Encounter difficulty. Return this card from your discard if the encounter is successful on a subsequent attempt.',
		tags: ['Malware']
	},
	{
		id: AbilityCardId.SIPHON,
		title: 'Siphon',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: 0,
		encounterText: 'Get Credits equal to the level of the encounter'
	},
	{
		id: AbilityCardId.TOOLKIT,
		title: 'Toolkit',
		primaryType: 'tech',
		rarity: 2,
		cost: 3,
		encounterValue: 0,
		encounterText: '+1 Encounter Value for each unique piece of equipment.'
	},
	{
		id: AbilityCardId.TROJAN_HORSE,
		title: 'Trojan Horse',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: 3,
		encounterText: 'If you fail this encounter, reveal all squares within 5',
		tags: ['Malware']
	},
	{
		id: AbilityCardId.ADAPTIVE_INTRUSION,
		title: 'Adaptive Intrusion',
		primaryType: 'tech',
		rarity: 2,
		cost: 2,
		encounterValue: -2,
		encounterText: 'If successful, Adapative Intrusion permanently gets +1 Encounter Value.'
	},
	{
		id: AbilityCardId.INSTALL_BACKDOOR,
		title: 'Install Backdoor',
		primaryType: 'tech',
		rarity: 3,
		cost: 2,
		encounterValue: 1,
		encounterText: 'On failure, -20 Encounter difficulty. Return this card from your discard if the encounter is successful on a subsequent attempt.',
		tags: ['Malware']
	},
	{
		id: AbilityCardId.X_RAY_VISION,
		title: 'X-Ray Vision',
		primaryType: 'tech',
		rarity: 3,
		cost: 3,
		encounterValue: 0,
		consumable: true,
		consumeText: 'Reveal all squares in a straight line',
	},
];
