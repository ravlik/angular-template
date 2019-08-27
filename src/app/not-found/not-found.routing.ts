import { NotFoundComponent } from './not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

const routes: Routes = [
    {
        path: '',
        component: NotFoundComponent,
        canActivate: [MetaGuard],
    },
];

export const NotFoundRoutes = RouterModule.forChild(routes);
