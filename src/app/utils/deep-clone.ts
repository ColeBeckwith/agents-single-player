export function deepClone<T>(object: T): T {
	// For primitives, we don't need to clone.
	if (typeof object !== 'object' || object === null) {
		return object;
	}

	let clone: any;

	// shake reference. This creates a shallow clone, so we can manipulate the top level properties without concern.
	if (Array.isArray(object)) {
		clone = object.slice();
	} else if (object instanceof Date) {
		clone = new Date(object);
	} else {
		clone = Object.assign({}, object);
	}

	// Clone each of the properties recursively
	Object.keys(clone).forEach(key => {
		clone[key] = deepClone(clone[key]);
	});

	return clone;
}
