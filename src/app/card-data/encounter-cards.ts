import { AbilityCardType } from './ability-cards';

export interface EncounterCard {
	id: string;
	title: string;
	level: 1 | 2 | 3 | 4;
	difficulty: number;
	strongTypes: AbilityCardType[];
	weakTypes: AbilityCardType[];
	text?: string;
	successText: string;
	failureText: string;
	mint?: number;
	snare?: boolean;
	tags?: string[];
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
		tags: ['CorpSec']
	},
	{
		id: 'trip-wire',
		title: 'Trip Wire',
		level: 1,
		difficulty: 3,
		strongTypes: ['stealth'],
		weakTypes: ['combat'],
		successText: '',
		failureText: 'Alert Level +1'
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
		tags: ['CorpSec']
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
		successText: '',
		failureText: ''
	},
	{
		id: 'freezer',
		title: 'Freezer',
		level: 2,
		difficulty: 7,
		strongTypes: ['tech'],
		weakTypes: ['combat', 'stealth'],
		text: 'Automatically succeeds if at least 1 Fire card is played.',
		successText: '',
		failureText: 'Health -1',
		tags: ['Ice']
	},
	{
		id: 'corpsec-guard',
		title: 'CorpSec Guard',
		level: 2,
		difficulty: 6,
		strongTypes: ['combat'],
		weakTypes: [],
		text: 'If successful without using any combat cards, gain CorpSec Uniform.',
		successText: '',
		failureText: '',
		tags: ['CorpSec']
	},
	{
		id: 'ice',
		title: 'ICE',
		level: 2,
		difficulty: 6,
		strongTypes: [],
		weakTypes: ['tech'],
		successText: '',
		failureText: ''
	},
	{
		id: 'mage',
		title: 'Mage',
		level: 2,
		difficulty: 7,
		strongTypes: ['magic'],
		weakTypes: [],
		successText: '',
		failureText: ''
	},
	{
		id: 'samurai',
		title: 'Samurai',
		level: 2,
		difficulty: 6,
		strongTypes: ['stealth', 'combat'],
		weakTypes: ['tech'],
		successText: '',
		failureText: ''
	},
	{
		id: 'vamp',
		title: 'Vamp',
		level: 2,
		difficulty: 7,
		strongTypes: ['magic', 'combat'],
		weakTypes: ['stealth'],
		successText: '',
		failureText: '',
		tags: ['Vamp']
	}
];

export const levelThreeEncounterCards: EncounterCard[] = [
	{
		id: 'elder-vamp',
		title: 'Elder Vamp',
		level: 3,
		difficulty: 12,
		strongTypes: ['magic'],
		weakTypes: ['stealth'],
		successText: '',
		failureText: '',
		tags: ['Vamp']
	},
	{
		id: 'laser-grid',
		title: 'Laser Grid',
		level: 3,
		difficulty: 13,
		strongTypes: ['stealth', 'tech'],
		weakTypes: ['combat', 'magic'],
		successText: '',
		failureText: 'Alert Level +3'
	},
	{
		id: 'corpsec-squadron',
		title: 'CorpSec Squadron',
		level: 3,
		difficulty: 12,
		strongTypes: ['combat', 'magic'],
		weakTypes: ['stealth'],
		successText: '',
		failureText: '',
		tags: ['CorpSec']
	},
	{
		id: 'black-ice',
		title: 'Black Ice',
		level: 3,
		difficulty: 10,
		strongTypes: [],
		weakTypes: ['tech'],
		successText: '',
		failureText: '-1 Tech Skill Point. Alert Level +2.'
	},
	{
		id: 'ice-princess',
		title: 'Ice Princess',
		level: 3,
		difficulty: 15,
		strongTypes: ['combat'],
		weakTypes: ['magic'],
		text: 'Automatically succeeds if 2 Fire cards are played.',
		successText: '+1 Magic Skill Point.',
		failureText: 'Health -3',
		tags: ['Ice']
	},
	{
		id: 'daedalus-creation',
		title: 'Daedalus\' Creation',
		level: 3,
		difficulty: 18,
		strongTypes: ['tech'],
		weakTypes: ['combat'],
		successText: '',
		failureText: 'Hide all squares except for the one you are currently on.'
	}
];

export const levelFourEncounterCards: EncounterCard[] = [
	{
		id: 'ice-queen',
		title: 'Ice Queen',
		level: 4,
		difficulty: 32,
		strongTypes: [],
		weakTypes: [ 'magic' ],
		text: 'Automatically succeeds if Inferno is played.',
		successText: '+2 Magic Skill Points.',
		failureText: 'Health -3. Movement Points permanently reduced by 1.',
		tags: ['Ice']
	},
	{
		id: 'corpsec-chopper',
		title: 'CorpSec Chopper',
		level: 4,
		difficulty: 28,
		strongTypes: ['combat'],
		weakTypes: [],
		successText: 'Alert Counter -15',
		failureText: 'Health -2',
		snare: true,
		tags: ['CorpSec']
	},
	{
		id: 'nos-fera',
		title: 'Nos Fera',
		level: 4,
		difficulty: 24,
		strongTypes: ['stealth'],
		weakTypes: ['tech'],
		successText: 'Gain trait \'Bitten\': Health +1 any time you are successful in an encounter against a Humanoid.',
		failureText: '-2 Max Health.',
		tags: ['Vamp']
	},
	{
		id: 'tempo',
		title: 'Tempo',
		level: 4,
		difficulty: 20,
		strongTypes: ['magic'],
		weakTypes: ['combat', 'stealth'],
		successText: 'Movement Points permanently increased by 1.',
		failureText: 'Return to the entrance and hide all other squares.'
	},
	{
		id: 'master-oji',
		title: 'Master Oji',
		level: 4,
		difficulty: 25,
		strongTypes: ['stealth'],
		weakTypes: ['combat'],
		successText: '+1 Stealth',
		failureText: '-1 Stealth'
	},
	{
		id: 'hivemind',
		title: 'Hivemind',
		level: 4,
		difficulty: 25,
		strongTypes: ['tech', 'stealth'],
		weakTypes: ['magic', 'combat'],
		successText: '+1 Tech',
		failureText: '-1 Tech'
	}
];
