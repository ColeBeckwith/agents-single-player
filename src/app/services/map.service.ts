import { Injectable } from '@angular/core';

import { RocXService } from '../roc-x/roc-x.service';

export type Map = Cell[][];

export interface Cell {
	// whether this cell is part of the map or is just a placeholder
	built: boolean;
	// the column the cell is in. zero-indexed
	xCoordinate: number;
	// the row the cell is in. zero-indexed
	yCoordinate: number;
	// the distance to the start cell from this cell
	distanceToStart: number;
	// whether this cell is the starting cell
	start: boolean;
	// tracks whether this cell is the exit
	exit: boolean;
	// tracks whether this cell has been given a feature or deliberately kept empty
	assigned: boolean;
	// whether an encounter exists on this square
	encounter: boolean;
	// the level of the encounter if it exists. 0 if it does not.
	encounterDifficulty: number;
	// whether an encounter has been cleared on this square
	encounterCleared: boolean;
	loot: boolean;
	lootRarity: number;
	boon: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class MapService extends RocXService {
	constructor() {
		super({ currentMap: null });
	}

	public generateMap(
		height: number,
		width: number,
		buildDensity: number = 0.3,
		encounterDensity: number = 0.3,
		encounterDifficultyModifier: number = 1,
		lootDensity: number = 0.05,
		boonDensity: number = 0.05
	) {
		let builtSquares = 0;
		let map: Cell[][] = [];
		// Create the board with a bunch of default cells without any characteristics.
		for (let y = 0; y < height; y++) {
			let row = [];
			for (let x = 0; x < width; x++) {
				row.push(<Cell>{
					start: false,
					built: false,
					xCoordinate: x,
					yCoordinate: y,
					distanceToStart: 9999,
					exit: false,
					assigned: true,
					encounter: false,
					encounterDifficulty: 0,
					encounterCleared: false,
					loot: false,
					lootRarity: 0,
					boon: false,
				});
			}
			map.push(row);
		}
		// pick a starting square somewhere in the first column.
		const startingSquareRow = Math.floor(Math.random() * (height - 4)) + 2;
		const startingSquare = map[startingSquareRow][0];
		startingSquare.start = true;
		startingSquare.built = true;
		startingSquare.assigned = true;
		builtSquares++;
		let currentSquare = startingSquare;

		let forks: { xCoordinate: number; yCoordinate: number }[] = [];

		const goToNextFork = () => {
			// const middleFork = forks[Math.floor(forks.length / 2)];
			// currentSquare = map[middleFork.yCoordinate][middleFork.xCoordinate];
			// forks = forks.filter((fork) => fork !== middleFork);

			const firstFork = forks[0];
			currentSquare = map[firstFork.yCoordinate][firstFork.xCoordinate];
			forks.shift();
		};

		while (builtSquares < height * width * buildDensity) {
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
					// Based on what is possible, decide which way to go. Generally prefer horizontal movement to vertical.
					if (downPossible && upPossible && rightPossible) {
						goingUp = chance <= 0.25;
						goingDown = chance > 0.25 && chance <= 0.5;
						goingRight = chance > 0.5;
					} else if (downPossible && upPossible && !rightPossible) {
						goingUp = chance <= 0.5;
						goingDown = chance > 0.5;
					} else if (downPossible && rightPossible && !upPossible) {
						goingRight = chance > 0.6;
						goingDown = chance <= 0.4;
					} else if (upPossible && rightPossible && !downPossible) {
						goingRight = chance > 0.6;
						goingUp = chance <= 0.4;
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
					currentSquare.assigned = false;
					builtSquares++;
				}
			}
		}

		if (builtSquares < height * width * buildDensity) {
			// The algorithm failed to build a dense enough map.
			console.warn('Unable to construct valid map. Final map result:');
			console.warn(map);
			// Try again.
			this.generateMap(height, width, buildDensity);
		} else {
			this.addFeaturesToMap(
				map,
				height,
				width,
				encounterDensity,
				encounterDifficultyModifier,
				lootDensity,
				boonDensity
			);
			this.set('currentMap', map);
		}
	}

	private addFeaturesToMap(
		map: Cell[][],
		height: number,
		width: number,
		encounterDensity: number,
		encounterDifficultyModifier: number,
		lootDensity: number,
		boonDensity: number
	) {
		if (encounterDensity + lootDensity + boonDensity > 1) {
			console.error(
				'Invalid Map Request: Encounter Density, Loot Density and Boon Density combined are greater than 100%.'
			);
		}
		const allBuiltCells = this.getAllBuiltCellsInMap(map);
		const startingCell = <Cell>allBuiltCells.find((cell) => cell.start);

		allBuiltCells.forEach((cell) => {
			cell.distanceToStart = this.getTravelDistanceFromPointToPoint(
				map,
				startingCell,
				cell
			);
		});

		const desiredExitDistance = height + width;
		// Sort all cells by their closeness to the desired exit distance.
		allBuiltCells.sort(
			(a, b) =>
				Math.abs(a.distanceToStart - desiredExitDistance) -
				Math.abs(b.distanceToStart - desiredExitDistance)
		);
		// pick the first one to be the exit.
		const exit = allBuiltCells[0];
		exit.exit = true;
		exit.assigned = true;

		const unassignedCells = allBuiltCells.filter((cell) => !cell.assigned);

		// Assign encounter, loot and boons to unassigned cells.
		const chanceSchedule = [
			encounterDensity,
			encounterDensity + lootDensity,
			encounterDensity + lootDensity + boonDensity,
		];
		const invertedModifier = 1 / encounterDifficultyModifier;
		const encounterDifficultySchedule = [
			0 * invertedModifier,
			0.6 * invertedModifier,
			0.95 * invertedModifier,
			1.3 * invertedModifier,
		];
		const lootRaritySchedule = [0, 0.9];
		unassignedCells.forEach((unassignedCell) => {
			const chanceForAssignment = Math.random();

			if (chanceForAssignment < chanceSchedule[0]) {
				unassignedCell.encounter = true;
				const chanceForEncounterDifficulty = Math.random();
				unassignedCell.encounterDifficulty =
					encounterDifficultySchedule.filter(
						(tier) => tier < chanceForEncounterDifficulty
					).length;
			} else if (chanceForAssignment < chanceSchedule[1]) {
				unassignedCell.loot = true;
				const chanceForLootRarity = Math.random();
				unassignedCell.lootRarity = lootRaritySchedule.filter(tier => tier < chanceForLootRarity).length;
			} else if (chanceForAssignment < chanceSchedule[2]) {
				unassignedCell.boon = true;
			}

			unassignedCell.assigned = true;
		});
	}

	private getNeighboringCells(map: Cell[][], cell: Cell) {
		var neighboringCells = [];
		// Cell above
		if (cell.yCoordinate !== 0) {
			neighboringCells.push(
				this.getCellOnMapFromCoordinates(
					map,
					cell.xCoordinate,
					cell.yCoordinate - 1
				)
			);
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
	private getTravelDistanceFromPointToPoint(
		map: Map,
		pointA: Cell,
		pointB: Cell
	) {
		let destinationReached = false;
		let distance = 0;

		if (pointA === pointB) {
			return distance;
		}

		const startingCell = this.getCellOnMapFromCoordinates(
			map,
			pointA.xCoordinate,
			pointA.yCoordinate
		);

		const checkedCells = [startingCell];
		let newCells = this.getNeighboringCells(map, startingCell);

		while (!destinationReached && distance < 100) {
			distance++;
			const cellsToCheckNext: Cell[] = [];

			newCells.forEach((newCell) => {
				checkedCells.push(newCell);

				if (
					newCell.xCoordinate === pointB.xCoordinate &&
					newCell.yCoordinate === pointB.yCoordinate
				) {
					destinationReached = true;
					return;
				}

				const neighboringCells = this.getNeighboringCells(map, newCell);

				neighboringCells.forEach((neighboringCell) => {
					if (
						checkedCells.indexOf(neighboringCell) === -1 &&
						cellsToCheckNext.indexOf(neighboringCell) === -1
					) {
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
	private getCellOnMapFromCoordinates(
		map: Map,
		xCoordinate: number,
		yCoordinate: number
	): Cell {
		return map[yCoordinate][xCoordinate];
	}

	// Helper function to return all cells in a map that have been built
	private getAllBuiltCellsInMap(map: Map): Cell[] {
		return map
			.reduce((allCells, row) => allCells.concat(row), [])
			.filter((cell) => cell.built);
	}
}
