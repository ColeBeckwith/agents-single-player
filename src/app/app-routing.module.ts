import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { RunSetupComponent } from './run-setup/run-setup.component';
import { runGuard } from './run.guard';
import { RunComponent } from './run/run.component';

const routes: Routes = [
	{ path: '', component: MainMenuComponent },
	{
		path: 'run-setup',
		component: RunSetupComponent
	},
	{
		path: 'run',
		component: RunComponent,
		canActivate: [ runGuard ]
	}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
