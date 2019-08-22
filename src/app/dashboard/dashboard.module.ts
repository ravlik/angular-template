import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { Translate } from '../translate/translate';
import { MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutes,
        Translate.localize('dashboard'),
        MatIconModule,
    ],
    declarations: [DashboardComponent],
})
export class DashboardModule {
}
