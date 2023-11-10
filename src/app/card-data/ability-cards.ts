import { EncounterConsequences } from './encounter-cards';

export type AbilityCardType = 'stealth' | 'magic' | 'tech' | 'combat';

export enum AbilityCardId {
	ADAPTIVE_INTRUSION = 'adaptive-intrusion',
	AIMED_SHOT = 'aimed-shot',
	AKIMBO = 'akimbo',
	AN_UNQUIET_MAN = 'an-unquiet-man',
	ASSASSINATE = 'assassinate',
	ASSEMBLY = 'assembly',
	BERSERK = 'berserk',
	BLAZE = 'blaze',
	BRANCH_OF_LIFE = 'branch-of-life',
	CHARGE = 'charge',
	DECOY = 'decoy',
	DEPARTING_GIFT = 'departing-gift',
	ENOUGH_TO_BE_DANGEROUS = 'enough-to-be-dangerous',
	FLAME = 'flame',
	FLAMETHROWER = 'flamethrower',
	FLICKER = 'flicker',
	GRENADE = 'grenade',
	HACK = 'hack',
	HIDDEN_BLADE = 'hidden-blade',
	HIDE = 'hide',
	IMPROVISED_EXPLOSIVE = 'improvised-explosive',
	IMPROVISED_WEAPON = 'improvised-weapon',
	INFERNO = 'inferno',
	INSTALL_BACKDOOR = 'install-backdoor',
	INSTALL_DAEMON = 'install-daemon',
	INSTALL_VIRUS = 'install-virus',
	LIGHTFOOTED = 'lightfooted',
	MAG_DUMP = 'mag-dump',
	MOMENTUM = 'momentum',
	OBSERVE_TACTICS = 'observe-tactics',
	PICKPOCKET = 'pickpocket',
	RECON = 'recon',
	REVERSE_METAMORPHOSIS = 'reverse-metamorphosis',
	REWIND = 'rewind',
	RUN_N_GUN = 'run-n-gun',
	SEED_OF_LIFE = 'seed-of-life',
	SILENCER = 'silencer',
	SIPHON = 'siphon',
	SLOW = 'slow',
	SNEAK = 'sneak',
	SONAR = 'sonar',
	SPARK = 'spark',
	STASH = 'stash',
	STOP = 'stop',
	SUMMONING_RITUAL = 'summoning-ritual',
	SUPRESSION = 'suppression',
	TELEPORT = 'teleport',
	TEND_WOUNDS = 'tend-wounds',
	TIPTOE = 'tiptoe',
	TOOLKIT = 'toolkit',
	TRANSMUTE = 'transmute',
	TREE_OF_LIFE = 'tree-of-life',
	TROJAN_HORSE = 'trojan-horse',
	X_RAY_VISION = 'x-ray-vision',
}

export interface AbilityCard {
	id: AbilityCardId;
	title: string;
	rarity: number;
	cost: number;
	encounterValue: number;
	encounterText?: string;
	encounterConsequences?: EncounterConsequences;
	encounterSuccessConsequences?: EncounterConsequences;
	encounterFailureConsequences?: EncounterConsequences;
	primaryType: AbilityCardType;
	secondaryTypes?: AbilityCardType[];
	consumable?: boolean;
	consumeText?: string;
	destroys?: boolean;
	// tracks which created card this was. Serves as a unique ID for each Ability Card rather than the ID which is only unique per type of card.
	mint?: number;
	successText?: string;
	tags?: string[];
	stagedValue?: number;
}






