import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DifficultyDisplayPipe } from './difficulty-display/difficulty-display.pipe';
import { HudAvatarComponent } from './hud-avatar/hud-avatar.component';
import { HudExperienceComponent } from './hud-experience/hud-experience.component';
import { HudHealthComponent } from './hud-health/hud-health.component';
import { HudSkillsComponent } from './hud-skills/hud-skills.component';
import { HudComponent } from './hud/hud.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MapCellComponent } from './map-cell/map-cell.component';
import { MapRowComponent } from './map-row/map-row.component';
import { MapComponent } from './map/map.component';
import { RunSetupComponent } from './run-setup/run-setup.component';
import { RunComponent } from './run/run.component';
import { ScenarioSelectComponent } from './scenario-select/scenario-select.component';

@NgModule({
	declarations: [
		AppComponent,
		RunSetupComponent,
		MainMenuComponent,
		ScenarioSelectComponent,
		DifficultyDisplayPipe,
		RunComponent,
		HudComponent,
		HudHealthComponent,
		HudSkillsComponent,
		HudAvatarComponent,
		HudExperienceComponent,
		MapComponent,
		MapRowComponent,
		MapCellComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCardModule,
		MatExpansionModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
