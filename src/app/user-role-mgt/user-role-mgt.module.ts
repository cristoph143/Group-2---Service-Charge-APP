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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserRoleComponent } from './edit-user-role/edit-user-role.component';
import { CreateUserRoleComponent } from './create-user-role/create-user-role.component';



@NgModule({
  declarations: [
    MenuUserRoleComponent,
    ListUserRoleComponent,
    ListUserComponent,
    CreateUserComponent,
    EditUserComponent,
    EditUserRoleComponent,
    CreateUserRoleComponent,
  ],
  imports: [
    CommonModule,
    UserRoleMgtRoutingModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class UserRoleMgtModule { }
