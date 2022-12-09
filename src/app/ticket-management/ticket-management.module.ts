import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketManagementRoutingModule } from './ticket-management-routing.module';
import { TicketListComponent } from '../users/ticket-list/ticket-list.component';


import { MenuComponent } from './menu/menu.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { AgingListComponent } from '../users/aging-list/aging-list.component';




@NgModule({
  declarations: [
    TicketListComponent, 
    AgingListComponent,
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
    
    
  ]
})
export class TicketManagementModule { }
