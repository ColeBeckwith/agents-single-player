import { AbilityCard } from './ability-cards';

export interface BaseCharacter {
	id: string;
	avatar: string;
	displayName: string;
	displayNameShort: string;
	startingStats: {
		health: number;
		credits: number;
		magic: number;
		stealth: number;
		combat: number;
		tech: number;
	};
	locked: boolean;
	startingDeck: AbilityCard[]
}

export const baseCharacters: BaseCharacter[] = [
	{
		id: 'jakobs',
		displayName: 'Ron Jakobs',
		displayNameShort: 'Jakobs',
		avatar: 'ron-jakobs-avatar.jpeg',
		startingStats: {
			health: 9,
			credits: 6,
			magic: 0,
			stealth: 0,
			combat: 5,
			tech: 0,
		},
		locked: false,
		startingDeck: [
			{
				id: 'run-n-gun',
				title: 'Run\'n\'Gun',
				primaryType: 'combat',
				cost: 0,
				rarity: 1,
				encounterValue: 1,
				consumable: true,
				consumeText: '+1 Movement Point'
			},
			{
				id: 'an-unquiet-man',
				title: 'An Unquiet Man',
				primaryType: 'combat',
				cost: 0,
				rarity: 1,
				encounterValue: 2,
				encounterText: '+1 Alert Level'
			},
			{
				id: 'an-unquiet-man',
				title: 'An Unquiet Man',
				primaryType: 'combat',
				cost: 0,
				rarity: 1,
				encounterValue: 2,
				encounterText: '+1 Alert Level'
			},
			{
				id: 'enough-to-be-dangerous',
				title: 'Enough To Be Dangerous',
				primaryType: 'combat',
				secondaryTypes: ['magic'],
				cost: 0,
				rarity: 1,
				encounterValue: 2,
			}
		]
	},
	{
		id: 'cane',
		displayName: 'Cane Burro',
		displayNameShort: 'Cane',
		avatar: 'cane-burro-avatar.jpg',
		startingStats: {
			health: 8,
			credits: 3,
			magic: 5,
			stealth: 1,
			combat: 1,
			tech: 1,
		},
		locked: true,
		startingDeck: []
	},
	{
		id: 'clyde',
		displayName: 'Clyde Kelly',
		displayNameShort: 'Clyde',
		avatar: 'clyde-kelly-avatar.jpeg',
		startingStats: {
			health: 6,
			credits: 8,
			magic: 1,
			stealth: 1,
			combat: 1,
			tech: 5,
		},
		locked: true,
		startingDeck: []
	},
	{
		id: 'decker',
		displayName: 'Decker',
		displayNameShort: 'Decker',
		avatar: 'decker-avatar.jpeg',
		startingStats: {
			health: 8,
			credits: 1,
			magic: 1,
			stealth: 3,
			combat: 2,
			tech: 2,
		},
		locked: true,
		startingDeck: []
	},
	{
		id: 'ghost',
		displayName: 'Ghost',
		displayNameShort: 'Ghost',
		avatar: 'ghost-avatar.jpeg',
		startingStats: {
			health: 9,
			credits: 2,
			magic: 4,
			stealth: 2,
			combat: 1,
			tech: 1,
		},
		locked: true,
		startingDeck: []
	},
	{
		id: 'houdini',
		displayName: 'HDN1',
		displayNameShort: 'HDN1',
		avatar: 'hdn1-avatar.jpeg',
		startingStats: {
			health: 5,
			credits: 0,
			magic: 3,
			stealth: 1,
			combat: 1,
			tech: 3,
		},
		locked: true,
		startingDeck: []
	},
	{
		id: 'orion',
		displayName: 'Orion',
		displayNameShort: 'Orion',
		avatar: 'orion-avatar.jpeg',
		startingStats: {
			health: 5,
			credits: 9,
			magic: 1,
			stealth: 2,
			combat: 2,
			tech: 2,
		},
		locked: true,
		startingDeck: []
	},
	{
		id: 'slade',
		displayName: 'Slade',
		displayNameShort: 'Slade',
		avatar: 'slade-avatar.jpeg',
		startingStats: {
			health: 4,
			credits: 2,
			magic: 1,
			stealth: 3,
			combat: 0,
			tech: 2,
		},
		locked: true,
		startingDeck: []
	},
	{
		id: 'guardian',
		displayName: 'The Guardian',
		displayNameShort: 'The Guardian',
		avatar: 'the-guardian-avatar.jpeg',
		startingStats: {
			health: 11,
			credits: 0,
			magic: 4,
			stealth: 0,
			combat: 4,
			tech: 0,
		},
		locked: true,
		startingDeck: []
	},
	{
		id: 'tinker',
		displayName: 'Tinker',
		displayNameShort: 'Tinker',
		avatar: 'tinker-avatar.jpeg',
		startingStats: {
			health: 6,
			credits: 4,
			magic: 1,
			stealth: 0,
			combat: 3,
			tech: 3,
		},
		locked: true,
		startingDeck: []
	},
	{
		id: 'yuri',
		displayName: 'Yuri Takashi',
		displayNameShort: 'Yuri',
		avatar: 'yuri-takashi-avatar.jpeg',
		startingStats: {
			health: 7,
			credits: 10,
			magic: 1,
			stealth: 3,
			combat: 3,
			tech: 1,
		},
		locked: true,
		startingDeck: []
	},
];