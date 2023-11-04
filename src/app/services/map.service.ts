import { Injectable } from '@angular/core';

import { RocXService } from '../roc-x/roc-x.service';
import { CharacterService, PlayerCharacter } from './character.service';
import { MapGenerationService } from './map-generation.service';
import { MapUtilitiesService } from './map-utilities.service';
import { PhaseService } from './phase.service';

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
	playerOccupies: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class MapService extends RocXService {
	constructor(
		private phaseService: PhaseService,
		private characterService: CharacterService,
		private mapGenerationService: MapGenerationService,
		private mapUtilitiesService: MapUtilitiesService
	) {
		super({ currentMap: null, movementPoints: 0 });

		this.phaseService.listen('movement').subscribe((movementPhase) => {
			if (movementPhase === true) {
				const playerCharacter: PlayerCharacter =
					this.characterService.grab('playerCharacter');
				this.set(
					'movementPoints',
					playerCharacter.stats.defaultMovementPoints
				);
			} else {
				this.set('movementPoints', 0);
			}
		});
	}

	public playerWalksUp() {
		this.movePlayer(0, -1);
	}

	public playerWalksDown() {
		this.movePlayer(0, 1);
	}

	public playerWalksLeft() {
		this.movePlayer(-1, 0);
	}

	public playerWalksRight() {
		this.movePlayer(1, 0);
	}

	public movePlayer(horizontalMovement: number, verticalMovement: number) {
		if (this.grab('movementPoints') === 0) {
			return;
		}
		const currentCell = this.getPlayerOccupiedCellInCurrentMap();
		if (!currentCell) {
			return;
		}
		const currentMap: Map = this.grab('currentMap');
		const desiredCellToMoveTo = this.mapUtilitiesService.getCellOnMapFromCoordinates(
			currentMap,
			currentCell.xCoordinate + horizontalMovement,
			currentCell.yCoordinate + verticalMovement
		);

		if (desiredCellToMoveTo && desiredCellToMoveTo.built) {
			desiredCellToMoveTo.playerOccupies = true;
			currentCell.playerOccupies = false;
			this.updateCellsInCurrentMap([desiredCellToMoveTo, currentCell]);
			this.deductMovementPoints(1);
		}
	}

	public finishMovementPhase() {
		const playerOccupiedCell = this.getPlayerOccupiedCellInCurrentMap();
		if (playerOccupiedCell?.encounter) {
			this.phaseService.endMovementWithEncounter();
		} else {
			this.phaseService.endMovementWithoutMapEvent();
		}
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
		const builtMap = this.mapGenerationService.generateMap(
			height,
			width,
			buildDensity
		);

		const builtMapWithFeatures = this.mapGenerationService.addFeaturesToMap(
			builtMap,
			height,
			width,
			encounterDensity,
			encounterDifficultyModifier,
			lootDensity,
			boonDensity
		);
		this.set('currentMap', builtMapWithFeatures);
	}


	private updateCellsInCurrentMap(cells: Cell[]) {
		const map = this.grab('currentMap');
		this.set('currentMap', this.mapUtilitiesService.updateCellsInMap(map, cells));
	}

	private getPlayerOccupiedCellInCurrentMap(): Cell | undefined {
		const cellsInCurrentMap = this.mapUtilitiesService.getAllBuiltCellsInMap(
			this.grab('currentMap')
		);
		return cellsInCurrentMap.find((cell) => cell.playerOccupies);
	}

	private deductMovementPoints(pointsToDeduct = 1) {
		const movementPoints = this.grab('movementPoints');
		this.set('movementPoints', movementPoints - pointsToDeduct);
	}
}
