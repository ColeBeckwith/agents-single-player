

import { AbilityCardDraftService } from './ability-card-draft.service';
import { CharacterService, PlayerCharacter } from './character.service';
import { PhaseService } from './phase.service';

describe('AbilityCardDraftService', () => {
	let service: AbilityCardDraftService;
	beforeEach(() => {
		service = new AbilityCardDraftService(
			new CharacterService(),
			new PhaseService()
		);
	});

	describe('getDraftCard', () => {
		it('should return magic cards closely proportional to the players skills on a large enough set', () => {
			const magicSkill = 10;
			const techSkill = 2;
			const stealthSkill = 5;
			const combatSkill = 18;
			const totalSkill = magicSkill + techSkill + stealthSkill + combatSkill;
			const playerCharacter: PlayerCharacter = <PlayerCharacter>{
				stats: {
					skills: {
						magic: magicSkill,
						tech: techSkill,
						stealth: stealthSkill,
						combat: combatSkill,
					},
				},
			};

			const totalCardsDrafted = 100000;
			const draftedCards = [];
			for (let i = 0; i < totalCardsDrafted; i++) {
				draftedCards.push(service.getDraftCard(playerCharacter));
			}
			expect(Math.abs((draftedCards.filter(abilityCard => abilityCard.primaryType === 'magic').length / totalCardsDrafted) - (magicSkill/totalSkill))).toBeLessThan(.01);
		});

		it('should return tech cards closely proportional to the players skills on a large enough set', () => {
			const magicSkill = 10;
			const techSkill = 2;
			const stealthSkill = 5;
			const combatSkill = 18;
			const totalSkill = magicSkill + techSkill + stealthSkill + combatSkill;
			const playerCharacter: PlayerCharacter = <PlayerCharacter>{
				stats: {
					skills: {
						magic: magicSkill,
						tech: techSkill,
						stealth: stealthSkill,
						combat: combatSkill,
					},
				},
			};

			const totalCardsDrafted = 100000;
			const draftedCards = [];
			for (let i = 0; i < totalCardsDrafted; i++) {
				draftedCards.push(service.getDraftCard(playerCharacter));
			}
			expect(Math.abs((draftedCards.filter(abilityCard => abilityCard.primaryType === 'tech').length / totalCardsDrafted) - (techSkill/totalSkill))).toBeLessThan(.01);
		});

		it('should return combat cards closely proportional to the players skills on a large enough set', () => {
			const magicSkill = 10;
			const techSkill = 2;
			const stealthSkill = 5;
			const combatSkill = 18;
			const totalSkill = magicSkill + techSkill + stealthSkill + combatSkill;
			const playerCharacter: PlayerCharacter = <PlayerCharacter>{
				stats: {
					skills: {
						magic: magicSkill,
						tech: techSkill,
						stealth: stealthSkill,
						combat: combatSkill,
					},
				},
			};

			const totalCardsDrafted = 100000;
			const draftedCards = [];
			for (let i = 0; i < totalCardsDrafted; i++) {
				draftedCards.push(service.getDraftCard(playerCharacter));
			}
			expect(Math.abs((draftedCards.filter(abilityCard => abilityCard.primaryType === 'combat').length / totalCardsDrafted) - (combatSkill/totalSkill))).toBeLessThan(.01);
		});

		it('should return stealth cards closely proportional to the players skills on a large enough set', () => {
			const magicSkill = 10;
			const techSkill = 2;
			const stealthSkill = 5;
			const combatSkill = 18;
			const totalSkill = magicSkill + techSkill + stealthSkill + combatSkill;
			const playerCharacter: PlayerCharacter = <PlayerCharacter>{
				stats: {
					skills: {
						magic: magicSkill,
						tech: techSkill,
						stealth: stealthSkill,
						combat: combatSkill,
					},
				},
			};

			const totalCardsDrafted = 100000;
			const draftedCards = [];
			for (let i = 0; i < totalCardsDrafted; i++) {
				draftedCards.push(service.getDraftCard(playerCharacter));
			}
			expect(Math.abs((draftedCards.filter(abilityCard => abilityCard.primaryType === 'stealth').length / totalCardsDrafted) - (stealthSkill/totalSkill))).toBeLessThan(.01);
		});
	});
});
