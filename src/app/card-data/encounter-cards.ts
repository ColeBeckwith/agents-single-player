import { AbilityCardType } from './ability-cards';

export interface EncounterCard {
	id: string;
	title: string;
	level: 1 | 2 | 3 | 4;
	difficulty: number;
	strongTypes: AbilityCardType[];
	weakTypes: AbilityCardType[];
	successText: string;
	failureText: string;
	mint?: number;
}

export const levelOneEncounterCards: EncounterCard[] = [
	{
		id: 'badge-scanner',
		title: 'Badge Scanner',
		level: 1,
		difficulty: 2,
		strongTypes: ['tech'],
		weakTypes: [],
		successText: '',
		failureText: 'Alert Level +1',
	},
	{
		id: 'sleeping-security-guard',
		title: 'Sleeping Security Guard',
		level: 1,
		difficulty: 2,
		strongTypes: ['stealth'],
		weakTypes: [],
		successText: 'Alert Level -1',
		failureText: 'Alert Level +2',
	},
	{
		id: 'fading-wisp',
		title: 'Fading Wisp',
		level: 1,
		difficulty: 2,
		strongTypes: ['magic'],
		weakTypes: [],
		successText: '',
		failureText: 'Health -1',
	},
	{
		id: 'frail-old-man',
		title: 'Frail Old Man',
		level: 1,
		difficulty: 2,
		strongTypes: ['combat'],
		weakTypes: [],
		successText: '',
		failureText: 'Health -1',
	},
	{
		id: 'security-camera',
		title: 'Security Camera',
		level: 1,
		difficulty: 3,
		strongTypes: ['tech', 'stealth'],
		weakTypes: [],
		successText: '',
		failureText: 'Alert Level +1',
	},
	{
		id: 'vacated-post',
		title: 'Vacated Post',
		level: 1,
		difficulty: 0,
		strongTypes: [],
		weakTypes: [],
		successText: '',
		failureText: 'Alert Level +2',
	},
	{
		id: 'power-outage',
		title: 'Power Outage',
		level: 1,
		difficulty: 0,
		strongTypes: [],
		weakTypes: [],
		successText: '',
		failureText: 'Alert Level +2',
	},
	{
		id: 'corpsec-trainee',
		title: 'CorpSec Trainee',
		level: 1,
		difficulty: 4,
		strongTypes: ['magic', 'combat', 'stealth'],
		weakTypes: [],
		successText: '',
		failureText: 'Spawn a Level 2 Encounter in 2 random adjacent spaces',
	},
	{
		id: 'outdated-security-bot',
		title: 'Outdated Security Bot',
		level: 1,
		difficulty: 4,
		strongTypes: ['combat', 'tech'],
		weakTypes: [],
		successText: '+1 Tech Skill Point',
		failureText: 'Health -1',
	},
	{
		id: 'mage-apprentice',
		title: 'Mage Apprentice',
		level: 1,
		difficulty: 4,
		strongTypes: ['magic'],
		weakTypes: [],
		successText: '+2 Magic Skill Points',
		failureText: 'Health -1',
	},
	{
		id: 'atm',
		title: 'ATM',
		level: 1,
		difficulty: 10,
		strongTypes: ['tech'],
		weakTypes: [],
		successText: 'Credits +2',
		failureText: 'Alert Level +3',
	},
];

export const levelTwoEncounterCards: EncounterCard[] = [
	{
		id: 'sentry-gun',
		title: 'Sentry Gun',
		level: 2,
		difficulty: 7,
		strongTypes: ['combat', 'tech'],
		weakTypes: [],
	},
	{
		id: 'corpsec-guard',
		title: 'CorpSec Guard',
		level: 2,
		difficulty: 6,
		strongTypes: ['combat'],
		weakTypes: [],
	},
	{
		id: 'ice',
		title: 'ICE',
		level: 2,
		difficulty: 6,
		strongTypes: [],
		weakTypes: ['tech'],
	},
	{
		id: 'mage',
		title: 'Mage',
		level: 2,
		difficulty: 7,
		strongTypes: ['magic'],
		weakTypes: [],
	},
	{
		id: 'samurai',
		title: 'Samurai',
		level: 2,
		difficulty: 6,
		strongTypes: ['stealth', 'combat'],
		weakTypes: ['tech'],
	},
];

export const levelThreeEncounterCards: EncounterCard[] = [
	{
		id: 'corpsec-squadron',
		title: 'CorpSec Squadron',
		level: 3,
		difficulty: 12,
		strongTypes: ['combat', 'magic'],
		weakTypes: ['stealth'],
	},
	{
		id: 'black-ice',
		title: 'Black Ice',
		level: 3,
		difficulty: 10,
		strongTypes: [],
		weakTypes: ['tech'],
	},
];

export const levelFourEncounterCards: EncounterCard[] = [];
