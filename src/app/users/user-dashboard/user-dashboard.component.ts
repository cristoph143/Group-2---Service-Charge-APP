import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketService } from '../../auth/services/ticket.service';

import { UsersService } from '../../auth/services/users.service';
import { Users } from '../../auth/model/user-interface';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../../auth/model/ticket-interface';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    ) { }

  users: Users[]=[];
  tickets: Ticket[]=[];
  ngOnInit(): void {
  }
}
