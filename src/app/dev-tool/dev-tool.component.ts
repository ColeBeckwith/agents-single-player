import { Component } from '@angular/core';

import { EncounterCard } from '../card-data/encounter-cards';
import { EncounterCardService } from '../services/encounter-card.service';

@Component({
	selector: 'app-dev-tool',
	templateUrl: './dev-tool.component.html',
	styleUrls: ['./dev-tool.component.scss'],
})
export class DevToolComponent {
	public encounterCards: EncounterCard[] = [];

	constructor(public encounterCardService: EncounterCardService) {
		for (let i = 0; i < 6; i++) {
			this.encounterCards.push(this.encounterCardService.getRandomEncounterCard(<any>Math.floor(Math.random() * 4 + 1)));
		}
	}
}
