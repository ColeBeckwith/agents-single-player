import { Injectable } from '@angular/core';

import { RocXService } from '../roc-x/roc-x.service';

@Injectable({
	providedIn: 'root',
})
export class PhaseService extends RocXService {
	constructor() {
		super({
			abilityCardDrafting: false,
			movement: false,
			encounter: false,
			alertLevel: false
		});
	}

	public startNewGame() {
		this.set('movement', true);
	}

	public finishAbilityCardDraft() {
		this.set('abilityCardDrafting', false);
	}

	public endMovementWithEncounter() {
		this.set('movement', false);
		this.set('encounter', true);
	}

	public endMovementWithoutMapEvent() {
		this.set('movement', false);
		this.set('alertLevel', true);
	}

	public completeAlertLevelPhase() {
		this.set('alertLevel', false);
		this.set('movement', true);
	}
}
