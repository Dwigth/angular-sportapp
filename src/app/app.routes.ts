import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AdminComponent } from './components/admin/admin.component';

const app_routes: Routes = [
    {path:'home', component: IndexComponent},
    {path:'admin', component: AdminComponent},
    {path: '**', pathMatch: 'full', redirectTo: '/home'}
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);