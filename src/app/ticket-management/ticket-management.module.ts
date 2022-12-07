import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketManagementRoutingModule } from './ticket-management-routing.module';
import { TicketListComponent } from '../users/ticket-list/ticket-list.component';
import { TicketWorkflowComponent } from '../users/ticket-workflow/ticket-workflow.component';
import { MenuComponent } from './menu/menu.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AgingTicketsComponent } from "../users/aging-tickets/aging-tickets.component";




@NgModule({
    declarations: [
        TicketListComponent,
        AgingTicketsComponent,
        TicketWorkflowComponent,
        MenuComponent,
    ],
    exports: [
        TicketListComponent,
        AgingTicketsComponent,
        TicketWorkflowComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        TicketManagementRoutingModule,
        MatListModule,
    ]
})
export class TicketManagementModule { }
