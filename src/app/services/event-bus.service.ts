import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

	// Fire when a character is initialized.
	public playerCharacterInitialized$ = new Subject();

	public playerCharacterLostHealth$ = new Subject();

	public playerDied$ = new Subject();
}
