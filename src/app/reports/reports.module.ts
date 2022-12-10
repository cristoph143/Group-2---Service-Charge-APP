import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from '../users/ticket-list/ticket-list.component';

import { MonthlyReportComponent } from '../monthly-report/monthly-report.component';
import { MenuReportsComponent } from './menu-reports/menu-reports.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { ReportsRoutingModule } from './reports-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { TicketManagementModule } from '../ticket-management/ticket-management.module';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialogActions } from '@angular/material/dialog';
import { AgingListComponent } from '../users/aging-list/aging-list.component';
import { ViewTicketPerAssigneeComponent } from '../users/view-ticket-per-assignee/view-ticket-per-assignee.component';



@NgModule({
  declarations: [
    MonthlyReportComponent,
    MenuReportsComponent,
    ViewTicketPerAssigneeComponent,
    
  ],
  imports: [
  
  CommonModule,
    MatListModule,
    ReportsRoutingModule,
    MatIconModule,
    TicketManagementModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [
    TicketListComponent,
    AgingListComponent,
    MatDialogActions,
    
  ]
})
export class ReportsModule { }
