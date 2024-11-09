import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo : 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
         
    },
    {
        path: '',
        component: LayoutComponent,
         
    },
    {
        path :'',
        component:LayoutComponent,
        children:[
            {
                path : 'dashboard',
                component : DashboardComponent
            }
        ]
    }
];
