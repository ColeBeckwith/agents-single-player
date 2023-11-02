import { Component } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss']
})
export class SubscriberComponent {
	public unsubscribe$ = new Subject();

	ngOnDestroy() {
		this.unsubscribe$.next({});
		this.unsubscribe$.complete();
	}
}
