import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            meta: {
                title: 'home.title',
                description: 'home.text',
                override: true,
            },
        },
    },
];

export const DashboardRoutes = RouterModule.forChild(routes);
