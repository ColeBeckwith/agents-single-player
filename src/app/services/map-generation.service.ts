import { Injectable } from '@angular/core';

import { MapUtilitiesService } from './map-utilities.service';
import { Cell, Map } from './map.service';

@Injectable({
	providedIn: 'root',
})
export class MapGenerationService {
	constructor(private mapUtilitiesService: MapUtilitiesService) {}

	public generateMap(
		height: number,
		width: number,
		buildDensity: number = 0.3
	): Map {
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
					playerOccupies: false,
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
		startingSquare.playerOccupies = true;
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
			return this.generateMap(height, width, buildDensity);
		} else {
			return map;
		}
	}

	public addFeaturesToMap(
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
		const allBuiltCells = this.mapUtilitiesService.getAllBuiltCellsInMap(map);
		const startingCell = <Cell>allBuiltCells.find((cell) => cell.start);

		allBuiltCells.forEach((cell) => {
			cell.distanceToStart = this.mapUtilitiesService.getTravelDistanceFromPointToPoint(
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
				// Use half of the boards dimensions so that we end up easier encounters at the beginning of the map and more difficult ones at the end.
				const chanceForEncounterDifficulty =
					Math.random() *
					(unassignedCell.distanceToStart / ((height + width) / 3));
				unassignedCell.encounterDifficulty =
					encounterDifficultySchedule.filter(
						(tier) => tier < chanceForEncounterDifficulty
					).length;
			} else if (chanceForAssignment < chanceSchedule[1]) {
				unassignedCell.loot = true;
				const chanceForLootRarity = Math.random();
				unassignedCell.lootRarity = lootRaritySchedule.filter(
					(tier) => tier < chanceForLootRarity
				).length;
			} else if (chanceForAssignment < chanceSchedule[2]) {
				unassignedCell.boon = true;
			}

			unassignedCell.assigned = true;
		});

		return map;
	}
}
