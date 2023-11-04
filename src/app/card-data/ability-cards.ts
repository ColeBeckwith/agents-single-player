

export type AbilityCardType = 'stealth' | 'magic' | 'tech' | 'combat';

export interface AbilityCard {
	id: string;
	title: string;
	rarity: number;
	cost: number;
	encounterValue: number;
	encounterText?: string;
	primaryType: AbilityCardType;
	secondaryTypes?: AbilityCardType[];
	consumable?: boolean;
	consumeText?: string;
	destroys?: boolean;
	// tracks which created card this was. Serves as a unique ID for each Ability Card rather than the ID which is only unique per type of card.
	mint?: number;
	successText?: string;
}






