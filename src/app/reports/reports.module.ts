import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from '../users/ticket-list/ticket-list.component';
import { MontlyReportsComponent } from '../users/monthly-reports/monthly-reports.component';
import { MonthlyReportComponent } from '../monthly-report/monthly-report.component';
import { MenuReportsComponent } from './menu-reports/menu-reports.component';
import { MatListModule } from '@angular/material/list';
import { ReportsRoutingModule } from './reports-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { TicketManagementModule } from '../ticket-management/ticket-management.module';



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
    MontlyReportsComponent,
  ]
})
export class ReportsModule { }
