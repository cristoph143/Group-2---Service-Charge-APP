import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketManagementRoutingModule } from './ticket-management-routing.module';
import { TicketListComponent } from '../users/ticket-list/ticket-list.component';
import { MontlyReportsComponent } from '../users/monthly-reports/monthly-reports.component';
import { TicketWorkflowComponent } from '../users/ticket-workflow/ticket-workflow.component';
import { MenuComponent } from './menu/menu.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    TicketListComponent,
    MontlyReportsComponent,
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
    MontlyReportsComponent,
    TicketWorkflowComponent,
  ]
})
export class TicketManagementModule { }
