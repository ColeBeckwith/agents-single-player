import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AbilityCard } from '../card-data/ability-cards';
import { AbilityCardDraftService } from '../services/ability-card-draft.service';

@Component({
	selector: 'app-ability-card-draft',
	templateUrl: './ability-card-draft.component.html',
	styleUrls: ['./ability-card-draft.component.scss'],
})
export class AbilityCardDraftComponent {
	public draftableCards$: Observable<AbilityCard[]>;
	
	constructor(private abilityCardDraftService: AbilityCardDraftService) {
	}

	ngOnInit() {
		this.draftableCards$ = this.abilityCardDraftService.listen('draftableCards');
	}
}
