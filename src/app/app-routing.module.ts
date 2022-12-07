import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/auth/login/login.component';
import { AuthGuard } from './auth/services/auth-guard.service';
import { MenuReportsComponent } from './reports/menu-reports/menu-reports.component';
import { MenuComponent } from './ticket-management/menu/menu.component';
import { MenuUserRoleComponent } from './user-role-mgt/menu-user-role/menu-user-role.component';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    // component: UserDashboardComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-dashboard',
        component: UserDashboardComponent
      },
    ]
  },
  {
    path: 'ticket-management',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'ticket-management',
        component: MenuComponent,
      },
    ]
  },
  {
    path: 'reports',
    component: MenuReportsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'reports',
        component: MenuReportsComponent,
      },
    ]
  },
  {
    path: 'user-role-management',
    component: MenuUserRoleComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-role-management',
        component: MenuUserRoleComponent,
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
