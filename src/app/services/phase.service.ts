import { Injectable } from '@angular/core';

import { RocXService } from '../roc-x/roc-x.service';

@Injectable({
	providedIn: 'root',
})
export class PhaseService extends RocXService {
	constructor() {
		super({
			abilityCardDrafting: false,
		});
	}

	public startNewGame() {
		this.set('abilityCardDrafting', true);
	}

	public finishAbilityCardDraft() {
		this.set('abilityCardDrafting', false);
	}
}
