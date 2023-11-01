import { Injectable } from '@angular/core';

import { RocXService } from '../roc-x/roc-x.service';

export type Map = Cell[][];

export interface Cell {
	start: boolean;
	built: boolean;
	xCoordinate: number;
	yCoordinate: number;
	distanceToStart?: number;
}

@Injectable({
	providedIn: 'root',
})
export class MapService extends RocXService {
	constructor() {
		super({ currentMap: null });
	}

	public generateMap(height: number, width: number, density: number = 0.5) {
		let builtSquares = 0;
		let map: Cell[][] = [];
		// Create the board with a bunch of default cells without any characteristics.
		for (let y = 0; y < height; y++) {
			let row = [];
			for (let x = 0; x < width; x++) {
				row.push({
					start: false,
					built: false,
					xCoordinate: x,
					yCoordinate: y,
				});
			}
			map.push(row);
		}
		// pick a starting square somewhere in the first column.
		const startingSquareRow = Math.floor(Math.random() * (height - 4)) + 2;
		const startingSquare = map[startingSquareRow][0];
		startingSquare.start = true;
		startingSquare.built = true;
		builtSquares++;
		let currentSquare = startingSquare;

		let forks: { xCoordinate: number; yCoordinate: number }[] = [];

		const goToNextFork = () => {
			const middleFork = forks[Math.floor(forks.length / 2)];
			currentSquare =
				map[middleFork.yCoordinate][middleFork.xCoordinate];
			forks = forks.filter(fork => fork !== middleFork);
		};

		while (builtSquares < height * width * density) {
			// if this square is in the final column start going back to the last fork and build from there.
			if (currentSquare.xCoordinate === width - 1) {
				if (forks.length > 0) {
					goToNextFork();
				} else {
					break;
				}
			} else {
				// check which directions are possible...
				const downPossible =
					currentSquare.yCoordinate !== height - 1 &&
					map[currentSquare.yCoordinate + 1][
						currentSquare.xCoordinate
					].built !== true;
				const upPossible =
					currentSquare.yCoordinate !== 0 &&
					map[currentSquare.yCoordinate - 1][
						currentSquare.xCoordinate
					].built !== true;
				const rightPossible =
					currentSquare.xCoordinate !== width - 1 &&
					map[currentSquare.yCoordinate][
						currentSquare.xCoordinate + 1
					].built !== true;

				if (!downPossible && !upPossible && !rightPossible) {
					if (forks.length > 0) {
						goToNextFork();
					} else {
						break;
					}
				} else {
					// Give a chance to split the path.
					const forking = Math.random() > 0.82;
					if (forking) {
						forks.push({
							xCoordinate: currentSquare.xCoordinate,
							yCoordinate: currentSquare.yCoordinate,
						});
					}

					// ... do some RNG to see which direction the path will go...
					let goingUp = false;
					let goingDown = false;
					let goingRight = false;
					let chance = Math.random();
					if (downPossible && upPossible && rightPossible) {
						goingUp = chance <= 0.3;
						goingDown = chance > 0.3 && chance <= 0.6;
						goingRight = chance > 0.6;
					} else if (downPossible && upPossible && !rightPossible) {
						goingUp = chance <= 0.5;
						goingDown = chance > 0.5;
					} else if (downPossible && rightPossible && !upPossible) {
						goingRight = chance > 0.5;
						goingDown = chance <= 0.5;
					} else if (upPossible && rightPossible && !downPossible) {
						goingRight = chance > 0.5;
						goingUp = chance <= 0.5;
					} else if (rightPossible && !downPossible && !upPossible) {
						goingRight = true;
					} else if (upPossible && !rightPossible && !downPossible) {
						goingUp = true;
					} else if (downPossible && !upPossible && !rightPossible) {
						goingDown = true;
					}

					// ...set that next square to the current square and mark it built...
					if (goingUp) {
						currentSquare =
							map[currentSquare.yCoordinate - 1][
								currentSquare.xCoordinate
							];
					} else if (goingDown) {
						currentSquare =
							map[currentSquare.yCoordinate + 1][
								currentSquare.xCoordinate
							];
					} else if (goingRight) {
						currentSquare =
							map[currentSquare.yCoordinate][
								currentSquare.xCoordinate + 1
							];
					}

					currentSquare.built = true;
					builtSquares++;
				}
			}
		}

		if (builtSquares < height * width * density) {
			// The algorithm failed to build a dense enough map.
			console.warn('Unable to construct valid map. Final map result:');
			console.warn(map);
			// Try again.
			this.generateMap(height, width, density);
		} else {
			this.addDetailsToMap(map);
			this.set('currentMap', map);
		}
	}

	private addDetailsToMap(map: Cell[][]) {
		const cellsToAddDistanceTo: Cell[] = [];
		let startingCell: Cell;
		map.forEach((row: Cell[]) => {
			row.forEach((cell: Cell) => {
				if (cell.start) {
					startingCell = cell;
				} else if (cell.built) {
					cellsToAddDistanceTo.push(cell);
				}
			});
		});
		cellsToAddDistanceTo.forEach((cell) => {
			cell.distanceToStart = this.getTravelDistanceFromPointToPoint(map, startingCell, cell);
		});
	}

	private getNeighboringCells(map: Cell[][], cell: Cell) {
		var neighboringCells = [];
		// Cell above
		if (cell.yCoordinate !== 0) {
			neighboringCells.push(this.getCellOnMapFromCoordinates(map, cell.xCoordinate, cell.yCoordinate - 1));
		}
		// Cell to the right
		if (cell.xCoordinate !== map[0].length - 1) {
			neighboringCells.push(map[cell.yCoordinate][cell.xCoordinate + 1]);
		}
		// Cell below
		if (cell.yCoordinate !== map.length - 1) {
			neighboringCells.push(map[cell.yCoordinate + 1][cell.xCoordinate]);
		}
		// Cell to the left
		if (cell.xCoordinate !== 0) {
			neighboringCells.push(map[cell.yCoordinate][cell.xCoordinate - 1]);
		}

		return neighboringCells.filter((cell) => cell.built);
	}


	// Helper function for getting the distance between two points. 
	private getTravelDistanceFromPointToPoint(map: Map, pointA: Cell, pointB: Cell) {
		let destinationReached = false;
		let distance = 0;

		if (pointA === pointB) {
			return distance;
		}

		const startingCell = this.getCellOnMapFromCoordinates(map, pointA.xCoordinate, pointA.yCoordinate);

		const checkedCells = [startingCell];
		let newCells = this.getNeighboringCells(map, startingCell);

		while (!destinationReached && distance < 100) {
			distance++;
			const cellsToCheckNext: Cell[] = [];

			newCells.forEach(newCell => {
				checkedCells.push(newCell);

				if (newCell.xCoordinate === pointB.xCoordinate && newCell.yCoordinate === pointB.yCoordinate) {
					destinationReached = true;
					return;
				}

				const neighboringCells = this.getNeighboringCells(map, newCell);

				neighboringCells.forEach(neighboringCell => {
					if (checkedCells.indexOf(neighboringCell) === -1 && cellsToCheckNext.indexOf(neighboringCell) === -1) {
						cellsToCheckNext.push(neighboringCell);
					}
				});
			});

			newCells = cellsToCheckNext;
		}

		return distance;
	}

	// Helper function that plucks a cell given an X and Y coordinate. Mostly here to prevent the frustration of typos and cognitive load of 
	// having to remember which is X and which is Y every time.
	private getCellOnMapFromCoordinates(map: Map, xCoordinate: number, yCoordinate: number): Cell {
		return map[yCoordinate][xCoordinate];
	}
}
