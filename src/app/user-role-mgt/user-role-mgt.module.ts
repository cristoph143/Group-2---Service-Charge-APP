import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuUserRoleComponent } from './menu-user-role/menu-user-role.component';
import { ListUserRoleComponent } from './list-user-role/list-user-role.component';
import { UserRoleMgtRoutingModule } from './user-role-mgt-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { ListUserComponent } from './list-user/list-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateUserComponent } from './create-user/create-user.component';



@NgModule({
  declarations: [
    MenuUserRoleComponent,
    ListUserRoleComponent,
    ListUserComponent,
    CreateUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoleMgtRoutingModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
  ]
})
export class UserRoleMgtModule { }
