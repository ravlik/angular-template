import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

export const routes: Routes = [
    {
        path: '',
        canActivate: [MetaGuard],
        component: DashboardComponent,
    },
];

export const DashboardRoutes = RouterModule.forChild(routes);
