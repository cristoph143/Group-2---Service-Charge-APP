import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from '../users/ticket-list/ticket-list.component';
import { MonthlyReportComponent } from '../monthly-report/monthly-report.component';
import { MenuReportsComponent } from './menu-reports/menu-reports.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { ReportsRoutingModule } from './reports-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { TicketManagementModule } from '../ticket-management/ticket-management.module';
import { AgingTicketsComponent } from '../users/aging-tickets/aging-tickets.component';



@NgModule({
  declarations: [
    MonthlyReportComponent,
    MenuReportsComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    ReportsRoutingModule,
    MatIconModule,
    TicketManagementModule,
  ],
  exports: [
    TicketListComponent,
    AgingTicketsComponent,
  ]
})
export class ReportsModule { }
