import { Injectable } from '@angular/core';

import { filter } from 'rxjs';

import { RocXService } from '../roc-x/roc-x.service';
import { CharacterService } from './character.service';
import { PhaseService } from './phase.service';

@Injectable({
	providedIn: 'root',
})
export class AlertLevelService extends RocXService {
	// The time of the alert level phase in milliseconds.
	public alertLevelPhaseDuration = 1500;

	constructor(private phaseService: PhaseService,
			private characterService: CharacterService) {
		super({
			alertLevel: -10,
		});

		this.phaseService
			.listen('alertLevel')
			.pipe(filter(Boolean))
			.subscribe(() => {
				setTimeout(() => {
					const newAlertLevel = this.grab('alertLevel') + 1;
					this.set('alertLevel', newAlertLevel);
					setTimeout(() => {
						if (newAlertLevel > 0) {
							this.characterService.reduceHealth(newAlertLevel);
						}
						setTimeout(() => {
							this.phaseService.completeAlertLevelPhase();
						}, this.alertLevelPhaseDuration / 3)
					}, this.alertLevelPhaseDuration / 3);
				}, this.alertLevelPhaseDuration / 3);
			});
	}

	public adjustAlertLevel(numberToAdjustBy: number) {
		let alertLevel = this.grab('alertLevel');
		alertLevel += numberToAdjustBy;
		this.set('alertLevel', alertLevel);
	}
}
