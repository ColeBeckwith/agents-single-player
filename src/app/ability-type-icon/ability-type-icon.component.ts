import { Component, Input } from '@angular/core';

import { AbilityCardType } from '../card-data/ability-cards';

@Component({
  selector: 'app-ability-type-icon',
  templateUrl: './ability-type-icon.component.html',
  styleUrls: ['./ability-type-icon.component.scss']
})
export class AbilityTypeIconComponent {
	@Input() abilityType: AbilityCardType;
}
