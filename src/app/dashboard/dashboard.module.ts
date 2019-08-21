import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { Translate } from '../translate/translate';

@NgModule({
    imports: [CommonModule, HomeRoutes, Translate.localize('dashboard')],
    declarations: [DashboardComponent],
})
export class DashboardModule {
}
