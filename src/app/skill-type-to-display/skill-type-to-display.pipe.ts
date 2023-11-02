import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'skillTypeToDisplay',
})
export class SkillTypeToDisplayPipe implements PipeTransform {
	private skillTypeToDisplayMap = {
		combat: 'Combat',
		stealth: 'Stealth',
		magic: 'Magic',
		tech: 'Tech'
	}
	
	transform(value: keyof typeof this.skillTypeToDisplayMap): string {
		return this.skillTypeToDisplayMap[value];
	}
}
