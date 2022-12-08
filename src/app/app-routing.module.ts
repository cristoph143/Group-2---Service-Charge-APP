import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/auth/login/login.component';
import { AuthGuard } from './auth/services/auth-guard.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
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
    component: LoginComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-dashboard',
        component: UserDashboardComponent,
      },
    ],
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
