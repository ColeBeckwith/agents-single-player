import { Injectable } from '@angular/core';

import { RocXService } from '../roc-x/roc-x.service';

@Injectable({
	providedIn: 'root',
})
export class AlertLevelService extends RocXService {
	constructor() {
		super({
			alertLevel: -10,
		});
	}
}
