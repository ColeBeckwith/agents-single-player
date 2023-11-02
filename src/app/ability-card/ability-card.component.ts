import { Component, Input } from '@angular/core';

import { AbilityCard } from '../card-data/ability-cards';

@Component({
  selector: 'app-ability-card',
  templateUrl: './ability-card.component.html',
  styleUrls: ['./ability-card.component.scss']
})
export class AbilityCardComponent {

	@Input() abilityCard: AbilityCard;
}
