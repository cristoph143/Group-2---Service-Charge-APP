import { NgModule } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyReportComponent } from '../monthly-report/monthly-report.component';
import { AgingListComponent } from '../users/aging-list/aging-list.component';

import { TicketListComponent } from '../users/ticket-list/ticket-list.component';
import { MenuReportsComponent } from './menu-reports/menu-reports.component';

const routes: Routes = [
    {
        path: 'reports', component: MenuReportsComponent,
        children: [
            { path: 'ticket-list', component: TicketListComponent},
            { path: 'aging-list', component: AgingListComponent},
            { path: 'monthly-report', component: MonthlyReportComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), MatDialogModule],
    exports: [RouterModule],
})
export class ReportsRoutingModule { }