import { Injectable } from '@angular/core';

import { EncounterCardService } from './encounter-card.service';
import { MapUtilitiesService } from './map-utilities.service';
import { Cell, Map } from './map.service';

@Injectable({
	providedIn: 'root',
})
export class MapGenerationService {
	constructor(private mapUtilitiesService: MapUtilitiesService, private encounterCardService: EncounterCardService) {}

	public generateMapV2(height: number, width: number, buildDensity: number = 0.3): Map {
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
					distanceToStart: 9999,
					exit: false,
					assigned: true,
					encounter: false,
					encounterDifficulty: null,
					assignedEncounter: null,
					encounterCleared: false,
					loot: false,
					lootRarity: 0,
					boon: false,
					playerOccupies: false,
					refresh: false,
				});
			}
			map.push(row);
		}
		// Start in the center of the board.
		const startingX = Math.ceil(width / 2);
		const startingY = Math.ceil(height / 2);
		let currentCell = <Cell>this.mapUtilitiesService.getCellOnMapFromCoordinates(map, startingX, startingY);
		currentCell.built = true;
		currentCell.assigned = false;
		builtSquares++;
		let attempts = 0;

		while (builtSquares < height * width * buildDensity) {
			attempts++;
			if (attempts > 1000) {
				break;
			}
			const chanceForDirection = Math.random();
			const goingUp = chanceForDirection <= 0.25;
			const goingDown = chanceForDirection > 0.25 && chanceForDirection <= 0.5;
			const goingRight = chanceForDirection > 0.5 && chanceForDirection <= 0.75;
			const goingLeft = chanceForDirection > 0.75;
			let nextCell: Cell | undefined;
			if (goingUp) {
				nextCell = this.mapUtilitiesService.getCellOnMapFromCoordinates(
					map,
					currentCell.xCoordinate,
					currentCell.yCoordinate - 1
				);
			}
			if (goingDown) {
				nextCell = this.mapUtilitiesService.getCellOnMapFromCoordinates(
					map,
					currentCell.xCoordinate,
					currentCell.yCoordinate + 1
				);
			}
			if (goingRight) {
				nextCell = this.mapUtilitiesService.getCellOnMapFromCoordinates(
					map,
					currentCell.xCoordinate + 1,
					currentCell.yCoordinate
				);
			}
			if (goingLeft) {
				nextCell = this.mapUtilitiesService.getCellOnMapFromCoordinates(
					map,
					currentCell.xCoordinate - 1,
					currentCell.yCoordinate
				);
			}
			if (nextCell) {
				if (!nextCell.built) {
					nextCell.built = true;
					nextCell.assigned = false;
					builtSquares++;
				}
				currentCell = nextCell;
			}
		}
		
		if (builtSquares < height * width * buildDensity) {
			console.error('Failed to build a dense enough map. Retrying.');
			return this.generateMapV2(height, width, buildDensity);
		}

		const builtCells = this.mapUtilitiesService.getAllBuiltCellsInMap(map);

		builtCells.sort((a, b) => a.xCoordinate - b.xCoordinate);
		builtCells[0].start = true;
		builtCells[0].assigned = true;
		builtCells[0].playerOccupies = true;

		return map;
	}

	public addFeaturesToMap(
		map: Cell[][],
		height: number,
		width: number,
		encounterDensity: number,
		encounterDifficultyModifier: number,
		lootDensity: number,
		boonDensity: number,
		numberOfRefreshes: number
	) {
		if (encounterDensity + lootDensity + boonDensity > 1) {
			console.error(
				'Invalid Map Request: Encounter Density, Loot Density and Boon Density combined are greater than 100%.'
			);
		}
		const allBuiltCells = this.mapUtilitiesService.getAllBuiltCellsInMap(map);
		const startingCell = <Cell>allBuiltCells.find((cell) => cell.start);

		allBuiltCells.forEach((cell) => {
			cell.distanceToStart = this.mapUtilitiesService.getTravelDistanceFromPointToPoint(map, startingCell, cell);
		});

		const desiredExitDistance = (height + width) / 2;
		// Sort all cells by their closeness to the desired exit distance.
		allBuiltCells.sort(
			(a, b) => Math.abs(a.distanceToStart - desiredExitDistance) - Math.abs(b.distanceToStart - desiredExitDistance)
		);
		// pick the first one to be the exit.
		const exit = allBuiltCells[0];
		exit.exit = true;
		exit.assigned = true;

		let unassignedCells = allBuiltCells.filter((cell) => !cell.assigned);

		for (let i = 0; i < numberOfRefreshes; i++) {
			const desiredRefreshDistance = (((height + width) / 2) * (i + 1)) / (numberOfRefreshes + 1);
			unassignedCells.sort(
				(a, b) =>
					Math.abs(a.distanceToStart - desiredRefreshDistance) - Math.abs(b.distanceToStart - desiredRefreshDistance)
			);
			const refreshCell = unassignedCells[0];
			refreshCell.refresh = true;
			refreshCell.assigned = true;
		}

		unassignedCells = unassignedCells.filter((cell) => !cell.assigned);

		// Assign encounter, loot and boons to unassigned cells.
		const chanceSchedule = [
			encounterDensity,
			encounterDensity + lootDensity,
			encounterDensity + lootDensity + boonDensity,
		];

		const encounterDifficultySchedule = [0, 1, 2, 3];
		const lootRaritySchedule = [0, 0.9];
		unassignedCells.forEach((unassignedCell) => {
			const chanceForAssignment = Math.random();

			if (chanceForAssignment < chanceSchedule[0]) {
				unassignedCell.encounter = true;
				// Use half of the boards dimensions so that we end up easier encounters at the beginning of the map and more difficult ones at the end.
				// const chanceForEncounterDifficulty = Math.random() * (unassignedCell.distanceToStart / ((height + width) / 3));
				let chanceForEncounterDifficulty = Math.random() + encounterDifficultyModifier;
				chanceForEncounterDifficulty = Math.max(0, chanceForEncounterDifficulty);
				unassignedCell.encounterDifficulty = <1 | 2 | 3 | 4>(
					encounterDifficultySchedule.filter((tier) => tier <= chanceForEncounterDifficulty).length
				);
				unassignedCell.assignedEncounter = this.encounterCardService.getRandomEncounterCard(
					unassignedCell.encounterDifficulty
				);
			} else if (chanceForAssignment < chanceSchedule[1]) {
				unassignedCell.loot = true;
				const chanceForLootRarity = Math.random();
				unassignedCell.lootRarity = lootRaritySchedule.filter((tier) => tier < chanceForLootRarity).length;
			} else if (chanceForAssignment < chanceSchedule[2]) {
				unassignedCell.boon = true;
			}

			unassignedCell.assigned = true;
		});

		return map;
	}
}
