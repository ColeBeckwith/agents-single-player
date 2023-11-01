import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AlertLevelService } from '../services/alert-level.service';

@Component({
  selector: 'app-hud-alert-counter',
  templateUrl: './hud-alert-counter.component.html',
  styleUrls: ['./hud-alert-counter.component.scss']
})
export class HudAlertCounterComponent {
	public alertLevel$: Observable<number>;

	constructor(private alertLevelService: AlertLevelService) {}

	ngOnInit() {
		this.alertLevel$ = this.alertLevelService.listen('alertLevel');
	}
}
