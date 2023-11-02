import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DifficultyDisplayPipe } from './difficulty-display/difficulty-display.pipe';
import { HudAlertCounterComponent } from './hud-alert-counter/hud-alert-counter.component';
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
import { AbilityCardDraftComponent } from './ability-card-draft/ability-card-draft.component';
import { AbilityCardComponent } from './ability-card/ability-card.component';
import { SkillTypeToDisplayPipe } from './skill-type-to-display/skill-type-to-display.pipe';
import { HudCreditsComponent } from './hud-credits/hud-credits.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { AbilityTypeIconComponent } from './ability-type-icon/ability-type-icon.component';
import { AbilityCardAffordablePipe } from './ability-card-affordable/ability-card-affordable.pipe';

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
		HudAlertCounterComponent,
  AbilityCardDraftComponent,
  AbilityCardComponent,
  SkillTypeToDisplayPipe,
  HudCreditsComponent,
  SubscriberComponent,
  AbilityTypeIconComponent,
  AbilityCardAffordablePipe,
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
		MatSliderModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
