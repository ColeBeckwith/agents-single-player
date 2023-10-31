import { BehaviorSubject, map, Observable, take } from 'rxjs';

import { deepClone } from '../utils/deep-clone';
import { findBestMatch } from '../utils/string-comparison';

export abstract class RocXService {
	private observableState: { [key: string]: BehaviorSubject<any> };
	private synchronousState: { [key: string]: any };

	constructor(state: { [key: string]: any }) {
		this.initialize(state);
	}

	public listen(propertyName: string): Observable<any> {
		if (!this.observableState[propertyName]) {
			this.throwPropertyDoesNotExistError(propertyName);
		}
		return this.observableState[propertyName].pipe(map(deepClone));
	}

	public grab(propertyName: string): any {
		return deepClone(this.synchronousState[propertyName]);
	}

	public set(propertyName: string, newValue: any): void {
		if (!this.observableState[propertyName]) {
			this.throwPropertyDoesNotExistError(propertyName);
		}
		this.synchronousState[propertyName] = newValue;
		this.observableState[propertyName].pipe(take(1)).subscribe(currentValue => {
			if (newValue !== currentValue) {
				this.observableState[propertyName].next(newValue);
			}
		});
	}

	private throwPropertyDoesNotExistError(propertyName: string) {
		const bestMatch = findBestMatch(propertyName, Object.keys(this.synchronousState));
		throw new Error(`State '${propertyName}' does not exist in this service. Did you mean '${bestMatch}'.`);
	}

	private initialize(state: { [key: string]: any }) {
		if (!state || Object.keys(state).length === 0) {
			throw new Error('RocX Service does not declare a state');
		} else {
			this.synchronousState = {};
			this.observableState = {};
			Object.entries(state).forEach(([key, value]) => {
				this.observableState[key] = new BehaviorSubject(value);
				this.synchronousState[key] = value;
			});
		}

		this.enableDevMode();
	}

	private enableDevMode() {
		document.addEventListener('keydown', event => {
			if (event.key === 'Z' && event.shiftKey) {
				console.log(this.synchronousState);
				console.log(this.observableState);
			}
		});
	}
}
