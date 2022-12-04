import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/auth/login/login.component';
import { AuthGuard } from './auth/services/auth-guard.service';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'login',
    // component: LoginComponent,
    component: UserDashboardComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'ticket-management',
        component: TicketManagementComponent,
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
