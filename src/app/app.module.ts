import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { TicketManagementModule } from './ticket-management/ticket-management.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';

import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatIconModule} from '@angular/material/icon';
import { MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { HttpClientModule } from '@angular/common/http';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import { MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';

import { HotToastModule } from '@ngneat/hot-toast';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';


import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import { TicketListComponent } from './users/ticket-list/ticket-list.component';
import { CreateListComponent } from './users/create-list/create-list.component';
import { UpdateListComponent } from './users/update-list/update-list.component';
import { ViewTicketComponent } from './users/view-ticket/view-ticket.component';
import { ViewTicketPerAssigneeComponent } from './users/view-ticket-per-assignee/view-ticket-per-assignee.component';
import { MenuComponent } from './ticket-management/menu/menu.component';
import { MenuReportsComponent } from './reports/menu-reports/menu-reports.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { ReportsModule } from './reports/reports.module';
import { MenuUserRoleComponent } from './user-role-mgt/menu-user-role/menu-user-role.component';
import { ListUserRoleComponent } from './user-role-mgt/list-user-role/list-user-role.component';
import { UserRoleMgtModule } from './user-role-mgt/user-role-mgt.module';


const appRoute: Routes =[
  {path: 'Home', component: UserDashboardComponent},
  // {path: 'chuchu/chu/:id', component: UserDashboardComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    NavbarComponent,
    // TicketListComponent,
    CreateListComponent,
    UpdateListComponent,
    // ViewTicketComponent,
    // AgingTicketComponent,
    // TicketWorkflowComponent,
    // ViewTicketPerAssigneeComponent,
    // AgingListComponent,
    // MenuUserRoleComponent,
    // ListUserRoleComponent,
    // MenuReportsComponent,
    // MonthlyReportComponent,
    // MenuComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    TicketManagementModule,
    ReportsModule,
    UserRoleMgtModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    MatCheckboxModule,
    MatInputModule,
    HotToastModule.forRoot(),
    MatDividerModule,
    // MatListModule,

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
