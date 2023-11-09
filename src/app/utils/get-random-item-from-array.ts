export function getRandomItemFromArray(array: any[]) {
	return array[Math.floor(Math.random() * array.length)];
}