import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketManagementRoutingModule } from './ticket-management-routing.module';
import { TicketListComponent } from '../users/ticket-list/ticket-list.component';
import { AgingTicketComponent } from '../users/aging-ticket/aging-ticket.component';
import { TicketWorkflowComponent } from '../users/ticket-workflow/ticket-workflow.component';
import { MenuComponent } from './menu/menu.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    TicketListComponent,
    AgingTicketComponent,
    TicketWorkflowComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TicketManagementRoutingModule,
    MatListModule,
  ],
  exports: [
    TicketListComponent,
    AgingTicketComponent,
    TicketWorkflowComponent,
  ]
})
export class TicketManagementModule { }
