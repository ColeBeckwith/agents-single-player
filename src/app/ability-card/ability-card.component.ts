import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AbilityCard } from '../card-data/ability-cards';

@Component({
  selector: 'app-ability-card',
  templateUrl: './ability-card.component.html',
  styleUrls: ['./ability-card.component.scss']
})
export class AbilityCardComponent {

	@Input() abilityCard: AbilityCard;

	@Input() discarded: boolean = false;

	@Output() consume = new EventEmitter();

}
