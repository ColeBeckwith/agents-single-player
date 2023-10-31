import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { CharacterService } from './services/character.service';

export const runGuard: CanActivateFn = (route, state) => {
	const characterService = inject(CharacterService);
	const router = inject(Router);
	const playerCharacter = characterService.grab('playerCharacter');
	if (playerCharacter) {
		return true;
	} else {
		router.navigate(['/run-setup']);
		return false;
	}
};
