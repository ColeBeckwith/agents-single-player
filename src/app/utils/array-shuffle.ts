export function arrayShuffle(arrayToShuffle: any[]): void {
	for (let i = arrayToShuffle.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arrayToShuffle[i], arrayToShuffle[j]] = [arrayToShuffle[j], arrayToShuffle[i]];
	}
}

