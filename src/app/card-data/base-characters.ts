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
}

export const baseCharacters: BaseCharacter[] = [
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
	},
	{
		id: 'jakobs',
		displayName: 'Ron Jakobs',
		displayNameShort: 'Jakobs',
		avatar: 'ron-jakobs-avatar.jpeg',
		startingStats: {
			health: 9,
			credits: 6,
			magic: 1,
			stealth: 1,
			combat: 5,
			tech: 1,
		},
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
	},
];