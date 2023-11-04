import { Injectable } from '@angular/core';

import { Cell, Map } from './map.service';

// A service of utilty functions for working with the map. All functionality here should be stateless and functional. There should not be any inject dependencies.
@Injectable({
	providedIn: 'root',
})
export class MapUtilitiesService {
	// Helper function that plucks a cell given an X and Y coordinate. Mostly here to prevent the frustration of typos and cognitive load of
	// having to remember which is X and which is Y every time.
	public getCellOnMapFromCoordinates(
		map: Map,
		xCoordinate: number,
		yCoordinate: number
	): Cell | undefined {
		if (yCoordinate < 0 || yCoordinate > map.length - 1) {
			return undefined;
		}
		return map[yCoordinate][xCoordinate];
	}

	public updateCellsInMap(map: Map, cells: Cell[]): Map {
		cells.forEach((cell) => {
			map[cell.yCoordinate][cell.xCoordinate] = cell;
		});
		return map;
	}

	// Helper function to return all cells in a map that have been built
	public getAllBuiltCellsInMap(map: Map): Cell[] {
		return map
			.reduce((allCells, row) => allCells.concat(row), [])
			.filter((cell) => cell.built);
	}

	public getNeighboringCells(map: Cell[][], cell: Cell): Cell[] {
		var neighboringCells = [];
		neighboringCells.push(
			this.getCellOnMapFromCoordinates(
				map,
				cell.xCoordinate,
				cell.yCoordinate - 1
			)
		);

		neighboringCells.push(
			this.getCellOnMapFromCoordinates(
				map,
				cell.xCoordinate + 1,
				cell.yCoordinate
			)
		);

		neighboringCells.push(
			this.getCellOnMapFromCoordinates(
				map,
				cell.xCoordinate,
				cell.yCoordinate + 1
			)
		);

		neighboringCells.push(
			this.getCellOnMapFromCoordinates(
				map,
				cell.xCoordinate - 1,
				cell.yCoordinate
			)
		);

		return <Cell[]>neighboringCells.filter((cell) => cell && cell.built);
	}

	// Helper function for getting the distance between two points.
	public getTravelDistanceFromPointToPoint(
		map: Map,
		pointA: Cell,
		pointB: Cell
	): number {
		let destinationReached = false;
		let distance = 0;

		if (pointA === pointB) {
			return distance;
		}

		// This can probably be removed and just use pointA
		const startingCell = <Cell>(
			this.getCellOnMapFromCoordinates(
				map,
				pointA.xCoordinate,
				pointA.yCoordinate
			)
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
}
