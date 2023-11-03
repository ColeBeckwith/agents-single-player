import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { PhaseService } from '../services/phase.service';
import { SubscriberComponent } from '../subscriber/subscriber.component';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent extends SubscriberComponent {
	public abilityCardDrafting$: Observable<boolean>;

	constructor(private phaseService: PhaseService) {
		super();
	}

	ngOnInit() {
		this.abilityCardDrafting$ = this.phaseService.listen('abilityCardDrafting');
	}

}
