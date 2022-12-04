import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from '../users/ticket-list/ticket-list.component';
import { AgingTicketComponent } from '../users/aging-ticket/aging-ticket.component';
import { MonthlyReportComponent } from '../monthly-report/monthly-report.component';
import { MenuReportsComponent } from '../menu-reports/menu-reports.component';
import { MatListModule } from '@angular/material/list';
import { ReportsRoutingModule } from './reports-routing.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    TicketListComponent,
    AgingTicketComponent,
    MonthlyReportComponent,
    MenuReportsComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    ReportsRoutingModule,
    MatIconModule,
  ],
  exports: [
    TicketListComponent,
    AgingTicketComponent,
    MonthlyReportComponent,
  ]
})
export class ReportsModule { }
