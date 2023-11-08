import { Component, Input } from '@angular/core';

import { EncounterCard } from '../card-data/encounter-cards';

@Component({
  selector: 'app-encounter-card',
  templateUrl: './encounter-card.component.html',
  styleUrls: ['./encounter-card.component.scss']
})
export class EncounterCardComponent {
	@Input() encounterCard: EncounterCard;
}
