import { AbilityCard, AbilityCardId } from './ability-cards';

export const jakobsDeck: AbilityCard[] = [
	{
		id: AbilityCardId.RUN_N_GUN,
		title: 'Run\'n\'Gun',
		primaryType: 'combat',
		cost: 0,
		rarity: 1,
		encounterValue: 1,
		consumable: true,
		consumeText: '+1 Movement Point'
	},
	{
		id: AbilityCardId.AN_UNQUIET_MAN,
		title: 'An Unquiet Man',
		primaryType: 'combat',
		cost: 0,
		rarity: 1,
		encounterValue: 2,
		encounterText: '+1 Alert Level',
		encounterConsequences: {
			alertLevel: 1
		}
	},
	{
		id: AbilityCardId.AN_UNQUIET_MAN,
		title: 'An Unquiet Man',
		primaryType: 'combat',
		cost: 0,
		rarity: 1,
		encounterValue: 2,
		encounterText: '+1 Alert Level',
		encounterConsequences: {
			alertLevel: 1
		}
	},
	{
		id: AbilityCardId.ENOUGH_TO_BE_DANGEROUS,
		title: 'Enough To Be Dangerous',
		primaryType: 'combat',
		secondaryTypes: ['magic'],
		cost: 0,
		rarity: 1,
		encounterValue: 2,
	},
	{
		id: AbilityCardId.AKIMBO,
		title: 'Akimbo',
		primaryType: 'combat',
		cost: 0,
		rarity: 1,
		encounterValue: 1,
		encounterText: 'Encounter Value is doubled if played with exactly one other Akimbo.'
	},
	{
		id: AbilityCardId.AKIMBO,
		title: 'Akimbo',
		primaryType: 'combat',
		cost: 0,
		rarity: 1,
		encounterValue: 1,
		encounterText: 'Encounter Value is doubled if played with exactly one other Akimbo.'
	}
	
]