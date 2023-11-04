import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AbilityCardAffordablePipe } from './ability-card-affordable/ability-card-affordable.pipe';
import { AbilityCardDraftComponent } from './ability-card-draft/ability-card-draft.component';
import { AbilityCardComponent } from './ability-card/ability-card.component';
import { AbilityTypeIconComponent } from './ability-type-icon/ability-type-icon.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DifficultyDisplayPipe } from './difficulty-display/difficulty-display.pipe';
import { HudAbilityCardDeckComponent } from './hud-ability-card-deck/hud-ability-card-deck.component';
import { HudAlertCounterComponent } from './hud-alert-counter/hud-alert-counter.component';
import { HudAvatarComponent } from './hud-avatar/hud-avatar.component';
import { HudCreditsComponent } from './hud-credits/hud-credits.component';
import { HudExperienceComponent } from './hud-experience/hud-experience.component';
import { HudHealthComponent } from './hud-health/hud-health.component';
import { HudMovementPointsComponent } from './hud-movement-points/hud-movement-points.component';
import { HudPhaseComponent } from './hud-phase/hud-phase.component';
import { HudSkillsComponent } from './hud-skills/hud-skills.component';
import { HudComponent } from './hud/hud.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MapCellComponent } from './map-cell/map-cell.component';
import { MapRowComponent } from './map-row/map-row.component';
import { MapComponent } from './map/map.component';
import { RunSetupComponent } from './run-setup/run-setup.component';
import { RunComponent } from './run/run.component';
import { ScenarioSelectComponent } from './scenario-select/scenario-select.component';
import { AbilityCardService } from './services/ability-card.service';
import { AlertLevelService } from './services/alert-level.service';
import { SkillTypeToDisplayPipe } from './skill-type-to-display/skill-type-to-display.pipe';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { GameOverComponent } from './game-over/game-over.component';

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
		HudAbilityCardDeckComponent,
		HudPhaseComponent,
		HudMovementPointsComponent,
  GameOverComponent,
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
		MatTabsModule,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			deps: [AbilityCardService, AlertLevelService],
			useFactory: () => null,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
