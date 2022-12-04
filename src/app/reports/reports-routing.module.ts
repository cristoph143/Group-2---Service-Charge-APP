import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuReportsComponent } from '../menu-reports/menu-reports.component';
import { MonthlyReportComponent } from '../monthly-report/monthly-report.component';
import { AgingTicketComponent } from '../users/aging-ticket/aging-ticket.component';
import { TicketListComponent } from '../users/ticket-list/ticket-list.component';

const routes: Routes = [
    {
        path: 'reports', component: MenuReportsComponent,
        children: [
            { path: 'ticket-list', component: TicketListComponent},
            { path: 'aging-ticket', component: AgingTicketComponent},
            { path: 'monthly-report', component: MonthlyReportComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportsRoutingModule { }