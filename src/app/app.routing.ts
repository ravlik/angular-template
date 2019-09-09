import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './auth/auth.module#AuthModule',
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
    },
    {
        path: 'users',
        loadChildren: './user/user.module#UserModule',
    },
    {
        path: 'error',
        loadChildren: './error/error.module#ErrorModule',
    },
    {
        path: '**',
        loadChildren: './not-found/not-found.module#NotFoundModule',
    },
];
// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, { initialNavigation: 'enabled' });
