import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuUserRoleComponent } from './menu-user-role/menu-user-role.component';
import { ListUserRoleComponent } from './list-user-role/list-user-role.component';
import { UserRoleMgtRoutingModule } from './user-role-mgt-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    MenuUserRoleComponent,
    ListUserRoleComponent,
  ],
  imports: [
    CommonModule,
    UserRoleMgtRoutingModule,
    MatIconModule,
    MatListModule,
  ]
})
export class UserRoleMgtModule { }
