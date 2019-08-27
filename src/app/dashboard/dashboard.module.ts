import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Translate } from '../translate/translate';
import { MatIconModule } from '@angular/material';
import { Meta } from 'meta';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutes,
        Translate.localize('dashboard'),
        MatIconModule,
        Meta.forChild(),
    ],
    providers: [],
    declarations: [DashboardComponent],
})
export class DashboardModule {
}
