import { AbilityCardType } from './ability-cards';

export interface EncounterCard {
	id: string;
	title: string;
	level: 1 | 2 | 3 | 4;
	difficulty: number;
	strongTypes: AbilityCardType[];
	weakTypes: AbilityCardType[];
}

export const levelOneEncounterCards: EncounterCard[] = [
	{
		id: 'badge-scanner',
		title: 'Badge Scanner',
		level: 1,
		difficulty: 2,
		strongTypes: ['tech'],
		weakTypes: [],
	},
	{
		id: 'sleeping-security-guard',
		title: 'Sleeping Security Guard',
		level: 1,
		difficulty: 2,
		strongTypes: ['stealth'],
		weakTypes: [],
	},
	{
		id: 'fading-wisp',
		title: 'Fading Wisp',
		level: 1,
		difficulty: 2,
		strongTypes: ['magic'],
		weakTypes: [],
	},
	{
		id: 'frail-old-man',
		title: 'Frail Old Man',
		level: 1,
		difficulty: 2,
		strongTypes: ['combat'],
		weakTypes: [],
	},
	{
		id: 'security-camera',
		title: 'Security Camera',
		level: 1,
		difficulty: 3,
		strongTypes: ['tech', 'stealth'],
		weakTypes: [],
	},
	{
		id: 'vacated-post',
		title: 'Vacated Post',
		level: 1,
		difficulty: 0,
		strongTypes: [],
		weakTypes: [],
	},
	{
		id: 'power-outage',
		title: 'Power Outage',
		level: 1,
		difficulty: 0,
		strongTypes: [],
		weakTypes: [],
	},
	{
		id: 'corpsec-trainee',
		title: 'CorpSec Trainee',
		level: 1,
		difficulty: 4,
		strongTypes: ['magic', 'combat', 'stealth'],
		weakTypes: [],
	},
	{
		id: 'outdated-security-bot',
		title: 'Outdated Security Bot',
	},
];
