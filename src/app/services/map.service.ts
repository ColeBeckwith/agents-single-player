import { Injectable } from '@angular/core';

import { EncounterCard } from '../card-data/encounter-cards';
import { RocXService } from '../roc-x/roc-x.service';
import { CharacterService } from './character.service';
import { EncounterService } from './encounter.service';
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
	// the level of the encounter if it exists.
	encounterDifficulty: 1 | 2 | 3 | 4 | null;
	// The encounter card representing the encounter if there is one.
	assignedEncounter: EncounterCard | null;
	// whether an encounter has been cleared on this square
	encounterCleared: boolean;
	loot: boolean;
	lootRarity: number;
	boon: boolean;
	playerOccupies: boolean;
	// Whether the cell is a refresh cell
	refresh: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class MapService extends RocXService {
	constructor(
		private phaseService: PhaseService,
		private characterService: CharacterService,
		private mapGenerationService: MapGenerationService,
		private mapUtilitiesService: MapUtilitiesService,
		private encounterService: EncounterService
	) {
		super({ currentMap: null, movementPoints: 0 });

		this.phaseService.listen('movement').subscribe((movementPhase) => {
			if (movementPhase === true) {
				const defaultMovementPoints = this.characterService.grab('defaultMovementPoints');
				this.set('movementPoints', defaultMovementPoints);
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
			this.encounterService.setActiveEncounter(playerOccupiedCell.assignedEncounter);
		} else {
			this.phaseService.endMovementWithoutMapEvent();
		}
	}

	public generateMap(
		height: number,
		width: number,
		buildDensity: number = 0.3,
		encounterDensity: number = 0.6,
		encounterDifficultyModifier: number = 0,
		lootDensity: number = 0.1,
		boonDensity: number = 0.1
	) {
		const builtMap = this.mapGenerationService.generateMapV2(height, width, buildDensity);

		const builtMapWithFeatures = this.mapGenerationService.addFeaturesToMap(
			builtMap,
			height,
			width,
			encounterDensity,
			encounterDifficultyModifier,
			lootDensity,
			boonDensity,
			1
		);
		this.set('currentMap', builtMapWithFeatures);
	}

	public removeEncounterByMint(mint: number) {
		const currentMap = this.grab('currentMap');
		const allBuiltCells = this.mapUtilitiesService.getAllBuiltCellsInMap(currentMap);
		const cellContainingEncouter = allBuiltCells.find(builtCell => builtCell.assignedEncounter?.mint === mint);
		if (cellContainingEncouter) {
			cellContainingEncouter.assignedEncounter = null;
			cellContainingEncouter.encounter = false;
			this.updateCellsInCurrentMap([cellContainingEncouter]);
		}
	}

	private updateCellsInCurrentMap(cells: Cell[]) {
		const map = this.grab('currentMap');
		this.set('currentMap', this.mapUtilitiesService.updateCellsInMap(map, cells));
	}

	private getPlayerOccupiedCellInCurrentMap(): Cell | undefined {
		const cellsInCurrentMap = this.mapUtilitiesService.getAllBuiltCellsInMap(this.grab('currentMap'));
		return cellsInCurrentMap.find((cell) => cell.playerOccupies);
	}

	private deductMovementPoints(pointsToDeduct = 1) {
		const movementPoints = this.grab('movementPoints');
		this.set('movementPoints', movementPoints - pointsToDeduct);
	}
}
