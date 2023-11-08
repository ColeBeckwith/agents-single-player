import { Injectable } from '@angular/core';

import { EncounterCard } from '../card-data/encounter-cards';
import { RocXService } from '../roc-x/roc-x.service';

@Injectable({
	providedIn: 'root',
})
export class EncounterService extends RocXService {
	constructor() {
		super({
			activeEncounter: null,
		});
	}

	setActiveEncounter(encounterCard: EncounterCard | null) {
		this.set('activeEncounter', encounterCard);
	}
}
