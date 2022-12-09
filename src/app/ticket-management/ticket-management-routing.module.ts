import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TicketListComponent } from '../users/ticket-list/ticket-list.component';

import { MenuComponent } from './menu/menu.component';


const routes: Routes = [
    {
        path: 'ticket-management', component: MenuComponent,
        children: [
            { path: 'ticket-list', component: TicketListComponent},
            
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TicketManagementRoutingModule { }