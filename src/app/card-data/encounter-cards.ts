import { AbilityCardType } from './ability-cards';

export interface EncounterCard {
	id: EncounterCardId;
	title: string;
	level: 1 | 2 | 3 | 4;
	difficulty: number;
	strongTypes: AbilityCardType[];
	weakTypes: AbilityCardType[];
	text?: string;
	successText: string;
	successConsequences?: EncounterConsequences;
	failureText: string;
	failureConsequences?: EncounterConsequences;
	mint?: number;
	snare?: boolean;
	tags?: string[];
}

export interface EncounterConsequences {
	credits?: number;
	health?: number;
	alertLevel?: number;
	combatStat?: number;
	combatSkillPoints?: number;
	stealthStat?: number;
	stealthSkillPoints?: number;
	techStat?: number;
	techSkillPoints?: number;
	magicStat?: number;
	magicSkillPoints?: number;
	maxHealth?: number;
	defaultMovementPoints?: number;
}

export enum EncounterCardId {
	ATM = 'atm',
	BADGE_SCANNER = 'badge-scanner',
	BLACK_ICE = 'black-ice',
	CORPSEC_CHOPPER = 'corpsec-chopper',
	CORPSEC_GUARD = 'corpsec-guard',
	CORPSEC_SQUADRON = 'corpsec-squadron',
	CORPSEC_TRAINEE = 'corpsec-trainee',
	DAEDALUS_CREATION = 'daedalus-creation',
	ELDER_VAMP = 'elder-vamp',
	FADING_WISP = 'fading-wisp',
	FRAIL_OLD_MAN = 'frail-old-man',
	FREEZER = 'freezer',
	HIVEMIND = 'hivemind',
	ICE = 'ice',
	ICE_PRINCESS = 'ice-princess',
	ICE_QUEEN = 'ice-queen',
	LASER_GRID = 'laser-grid',
	MAGE = 'mage',
	MAGE_APPRENTICE = 'mage-apprentice',
	MASTER_OJI = 'master-oji',
	NOS_FERA = 'nos-fera',
	OUTDATED_SECURITY_BOT = 'outdated-security-bot',
	POWER_OUTAGE = 'power-outage',
	SAMURAI = 'samurai',
	SECURITY_CAMERA = 'security-camera',
	SENTRY_GUN = 'sentry-gun',
	SLEEPING_SECURITY_GUARD = 'sleeping-security-guard',
	TEMPO = 'tempo',
	TRIP_WIRE = 'trip-wire',
	VACATED_POST = 'vacated-post',
	VAMP = 'vamp',
}

export const levelOneEncounterCards: EncounterCard[] = [
	{
		id: EncounterCardId.BADGE_SCANNER,
		title: 'Badge Scanner',
		level: 1,
		difficulty: 2,
		strongTypes: ['tech'],
		weakTypes: [],
		successText: '',
		failureText: 'Alert Level +1',
		failureConsequences: {
			alertLevel: 1
		}
	},
	{
		id: EncounterCardId.SLEEPING_SECURITY_GUARD,
		title: 'Sleeping Security Guard',
		level: 1,
		difficulty: 2,
		strongTypes: ['stealth'],
		weakTypes: [],
		successText: 'Alert Level -1',
		successConsequences: {
			alertLevel: -1
		},
		failureText: 'Alert Level +2',
		failureConsequences: {
			alertLevel: 2
		},
		tags: ['CorpSec']
	},
	{
		id: EncounterCardId.TRIP_WIRE,
		title: 'Trip Wire',
		level: 1,
		difficulty: 3,
		strongTypes: ['stealth'],
		weakTypes: ['combat'],
		successText: '',
		failureText: 'Alert Level +1',
		failureConsequences: {
			alertLevel: 1
		}
	},
	{
		id: EncounterCardId.FADING_WISP,
		title: 'Fading Wisp',
		level: 1,
		difficulty: 2,
		strongTypes: ['magic'],
		weakTypes: [],
		successText: '',
		failureText: 'Health -1',
		failureConsequences: {
			health: -1
		}
	},
	{
		id: EncounterCardId.FRAIL_OLD_MAN,
		title: 'Frail Old Man',
		level: 1,
		difficulty: 2,
		strongTypes: ['combat'],
		weakTypes: [],
		successText: '',
		failureText: 'Health -1',
		failureConsequences: {
			health: -1
		}
	},
	{
		id: EncounterCardId.SECURITY_CAMERA,
		title: 'Security Camera',
		level: 1,
		difficulty: 3,
		strongTypes: ['tech', 'stealth'],
		weakTypes: [],
		successText: '',
		failureText: 'Alert Level +1',
		failureConsequences: {
			alertLevel: 1
		}
	},
	{
		id: EncounterCardId.VACATED_POST,
		title: 'Vacated Post',
		level: 1,
		difficulty: 0,
		strongTypes: [],
		weakTypes: [],
		successText: '',
		failureText: 'Alert Level +2',
		failureConsequences: {
			alertLevel: 2
		}
	},
	{
		id: EncounterCardId.POWER_OUTAGE,
		title: 'Power Outage',
		level: 1,
		difficulty: 0,
		strongTypes: [],
		weakTypes: [],
		successText: '',
		failureText: 'Alert Level +2',
		failureConsequences: {
			alertLevel: 2
		}
	},
	{
		id: EncounterCardId.CORPSEC_TRAINEE,
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
		id: EncounterCardId.OUTDATED_SECURITY_BOT,
		title: 'Outdated Security Bot',
		level: 1,
		difficulty: 4,
		strongTypes: ['combat', 'tech'],
		weakTypes: [],
		successText: '+1 Tech Skill Point',
		successConsequences: {
			techSkillPoints: 1
		},
		failureText: 'Health -1',
		failureConsequences: {
			health: -1
		}
	},
	{
		id: EncounterCardId.MAGE_APPRENTICE,
		title: 'Mage Apprentice',
		level: 1,
		difficulty: 4,
		strongTypes: ['magic'],
		weakTypes: [],
		successText: '+2 Magic Skill Points',
		successConsequences: {
			magicSkillPoints: 2
		},
		failureText: 'Health -1',
		failureConsequences: {
			health: -1
		}
	},
	{
		id: EncounterCardId.ATM,
		title: 'ATM',
		level: 1,
		difficulty: 10,
		strongTypes: ['tech'],
		weakTypes: [],
		successText: 'Credits +2',
		successConsequences: {
			credits: 2
		},
		failureText: 'Alert Level +3',
		failureConsequences: {
			alertLevel: 3
		}
	},
];

export const levelTwoEncounterCards: EncounterCard[] = [
	{
		id: EncounterCardId.SENTRY_GUN,
		title: 'Sentry Gun',
		level: 2,
		difficulty: 7,
		strongTypes: ['combat', 'tech'],
		weakTypes: [],
		successText: '',
		failureText: ''
	},
	{
		id: EncounterCardId.FREEZER,
		title: 'Freezer',
		level: 2,
		difficulty: 7,
		strongTypes: ['tech'],
		weakTypes: ['combat', 'stealth'],
		text: 'Automatically succeeds if at least 1 Fire card is played.',
		successText: '',
		failureText: 'Health -1',
		failureConsequences: {
			health: -1
		},
		tags: ['Ice']
	},
	{
		id: EncounterCardId.CORPSEC_GUARD,
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
		id: EncounterCardId.ICE,
		title: 'ICE',
		level: 2,
		difficulty: 6,
		strongTypes: [],
		weakTypes: ['tech'],
		successText: '',
		failureText: ''
	},
	{
		id: EncounterCardId.MAGE,
		title: 'Mage',
		level: 2,
		difficulty: 7,
		strongTypes: ['magic'],
		weakTypes: [],
		successText: '',
		failureText: ''
	},
	{
		id: EncounterCardId.SAMURAI,
		title: 'Samurai',
		level: 2,
		difficulty: 6,
		strongTypes: ['stealth', 'combat'],
		weakTypes: ['tech'],
		successText: '',
		failureText: ''
	},
	{
		id: EncounterCardId.VAMP,
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
		id: EncounterCardId.ELDER_VAMP,
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
		id: EncounterCardId.LASER_GRID,
		title: 'Laser Grid',
		level: 3,
		difficulty: 13,
		strongTypes: ['stealth', 'tech'],
		weakTypes: ['combat', 'magic'],
		successText: '',
		failureText: 'Alert Level +3',
		failureConsequences: {
			alertLevel: 3
		}
	},
	{
		id: EncounterCardId.CORPSEC_SQUADRON,
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
		id: EncounterCardId.BLACK_ICE,
		title: 'Black Ice',
		level: 3,
		difficulty: 10,
		strongTypes: [],
		weakTypes: ['tech'],
		successText: '+1 Tech Skill Point.',
		successConsequences: {
			techSkillPoints: 1
		},
		failureText: '-1 Tech Skill Point. Alert Level +2.',
		failureConsequences: {
			techSkillPoints: -1,
			alertLevel: 2
		}
	},
	{
		id: EncounterCardId.ICE_PRINCESS,
		title: 'Ice Princess',
		level: 3,
		difficulty: 15,
		strongTypes: ['combat'],
		weakTypes: ['magic'],
		text: 'Automatically succeeds if 2 Fire cards are played.',
		successText: '+1 Magic Skill Point.',
		successConsequences: {
			magicSkillPoints: 1
		},
		failureText: 'Health -3',
		failureConsequences: {
			health: -3
		},
		tags: ['Ice']
	},
	{
		id: EncounterCardId.DAEDALUS_CREATION,
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
		id: EncounterCardId.ICE_QUEEN,
		title: 'Ice Queen',
		level: 4,
		difficulty: 32,
		strongTypes: [],
		weakTypes: [ 'magic' ],
		text: 'Automatically succeeds if Inferno is played.',
		successText: '+2 Magic Skill Points.',
		successConsequences: {
			magicSkillPoints: 2
		},
		failureText: 'Health -3. Movement Points permanently reduced by 1.',
		failureConsequences: {
			health: -3,
			defaultMovementPoints: -1
		},
		tags: ['Ice']
	},
	{
		id: EncounterCardId.CORPSEC_CHOPPER,
		title: 'CorpSec Chopper',
		level: 4,
		difficulty: 28,
		strongTypes: ['combat'],
		weakTypes: [],
		successText: 'Alert Level -15',
		successConsequences: {
			alertLevel: -15
		},
		failureText: 'Health -2',
		failureConsequences: {
			health: -2
		},
		snare: true,
		tags: ['CorpSec']
	},
	{
		id: EncounterCardId.NOS_FERA,
		title: 'Nos Fera',
		level: 4,
		difficulty: 24,
		strongTypes: ['stealth'],
		weakTypes: ['tech'],
		successText: 'Gain trait \'Bitten\': Health +1 any time you are successful in an encounter against a Humanoid.',
		failureText: '-2 Max Health.',
		failureConsequences: {
			maxHealth: -2
		},
		tags: ['Vamp']
	},
	{
		id: EncounterCardId.TEMPO,
		title: 'Tempo',
		level: 4,
		difficulty: 20,
		strongTypes: ['magic'],
		weakTypes: ['combat', 'stealth'],
		successText: 'Movement Points permanently increased by 1.',
		successConsequences: {
			defaultMovementPoints: 1
		},
		failureText: 'Return to the entrance and hide all other squares.'
	},
	{
		id: EncounterCardId.MASTER_OJI,
		title: 'Master Oji',
		level: 4,
		difficulty: 25,
		strongTypes: ['stealth'],
		weakTypes: ['combat'],
		successText: '+1 Stealth',
		successConsequences: {
			stealthStat: 1
		},
		failureText: '-1 Stealth',
		failureConsequences: {
			stealthStat: -1
		}
	},
	{
		id: EncounterCardId.HIVEMIND,
		title: 'Hivemind',
		level: 4,
		difficulty: 25,
		strongTypes: ['tech', 'stealth'],
		weakTypes: ['magic', 'combat'],
		successText: '+1 Tech',
		successConsequences: {
			techStat: 1
		},
		failureText: '-1 Tech',
		failureConsequences: {
			techStat: -1
		}
	}
];
