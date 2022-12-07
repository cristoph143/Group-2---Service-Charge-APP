import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/auth/model/ticket-interface';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { ViewTicketPerAssigneeComponent } from '../view-ticket-per-assignee/view-ticket-per-assignee.component';

@Component({
  selector: 'app-aging-tickets',
  templateUrl: './aging-tickets.component.html',
  styleUrls: ['./aging-tickets.component.css']
})
export class AgingTicketsComponent implements OnInit {
  
  ngOnInit(): void { }


}
