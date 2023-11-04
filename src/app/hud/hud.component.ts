import { Component } from '@angular/core';

import { EventBusService } from '../services/event-bus.service';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss']
})
export class HudComponent {
	public damageTaken = false;

	constructor(public eventBusService: EventBusService) {}

	ngOnInit() {
		this.eventBusService.playerCharacterLostHealth$.subscribe(() => {
			console.log('lostHealth')
			this.damageTaken = true;
			setTimeout(() => {
				this.damageTaken = false;
			}, 600);
		});
	}
}
