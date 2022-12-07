import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from '../users/ticket-list/ticket-list.component';
import { MontlyReportsComponent } from '../users/monthly-reports/monthly-reports.component';
import { TicketWorkflowComponent } from '../users/ticket-workflow/ticket-workflow.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
    {
        path: 'ticket-management', component: MenuComponent,
        children: [
            { path: 'ticket-list', component: TicketListComponent},
            { path: 'monthly-reports', component: MontlyReportsComponent},
            { path: 'ticket-workflow', component: TicketWorkflowComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TicketManagementRoutingModule { }