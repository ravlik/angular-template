import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { UserComponent } from './user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [MetaGuard],
        component: UserComponent,
    },
    {
        path: ':id',
        component: UserDetailsComponent,
    },
    {
        path: ':id/edit',
        component: UserEditComponent,
    }
];

export const UserRoutes = RouterModule.forChild(routes);
