import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgingListComponent } from '../users/aging-list/aging-list.component';

import { TicketListComponent } from '../users/ticket-list/ticket-list.component';

import { MenuComponent } from './menu/menu.component';
import { AgingTicketsComponent } from '../users/aging-tickets/aging-tickets.component';


const routes: Routes = [
    {
        path: 'ticket-management', component: MenuComponent,
        children: [
            { path: 'ticket-list', component: TicketListComponent},
            { path: 'aging-list', component: AgingListComponent}
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TicketManagementRoutingModule { }