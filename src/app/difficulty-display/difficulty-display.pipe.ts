import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'difficultyDisplay',
})
export class DifficultyDisplayPipe implements PipeTransform {
	private difficultyToDisplayMap = ['Easy', 'Medium', 'Hard'];

	transform(value: number): string {
		return this.difficultyToDisplayMap[value - 1];
	}
}
