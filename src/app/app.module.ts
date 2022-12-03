import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatInputModule } from "@angular/material/input";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';

import { HotToastModule } from '@ngneat/hot-toast';
import {MatPaginatorModule} from '@angular/material/paginator';


import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { TicketListComponent } from './users/ticket-list/ticket-list.component';
import { CreateListComponent } from './users/create-list/create-list.component';
import { UpdateListComponent } from './users/update-list/update-list.component';
import { ViewTicketComponent } from './users/view-ticket/view-ticket.component';
import { AgingTicketComponent } from './users/aging-ticket/aging-ticket.component';
import { TicketWorkflowComponent } from './users/ticket-workflow/ticket-workflow.component';
import { ViewTicketPerAssigneeComponent } from './users/view-ticket-per-assignee/view-ticket-per-assignee.component';
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
    TicketListComponent,
    CreateListComponent,
    UpdateListComponent,
    ViewTicketComponent,
    AgingTicketComponent,
    TicketWorkflowComponent,
    ViewTicketPerAssigneeComponent,
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
    MatListModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
