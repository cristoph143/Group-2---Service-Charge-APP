import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserRoleComponent } from './list-user-role/list-user-role.component';
import { ListUserComponent } from './list-user/list-user.component';
import { MenuUserRoleComponent } from './menu-user-role/menu-user-role.component';

const routes: Routes = [
    {
        path: 'user-role-management', component: MenuUserRoleComponent,
        children: [
            { path: 'user-role-list', component: ListUserRoleComponent},
            { path: 'user-list', component: ListUserComponent},
            // { path: 'ticket-workflow', component: TicketWorkflowComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoleMgtRoutingModule { }