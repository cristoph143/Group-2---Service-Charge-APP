import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { CreateListComponent } from '../create-list/create-list.component';
import { UpdateListComponent } from '../update-list/update-list.component';

@Component({
  selector: 'app-view-ticket-per-assignee',
  templateUrl: './view-ticket-per-assignee.component.html',
  styleUrls: ['./view-ticket-per-assignee.component.css']
})
export class ViewTicketPerAssigneeComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<any>();
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private ticketService: TicketService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

 

  tickets: any;
  user: any;
  ngOnInit(): void {
    this.tickets = this.data.datas;
    this.user = this.data.user;
    this.getHeader();
  }

  headers: any;

  getHeader(){
    //if admin naay assigneeID
    if(this.user.roleID == 102){
      this.headers = ["TicketID", "AssigneeID", "Status", "Subject", "Description"];
    }else{
      this.headers = ["TicketID", "Status", "Subject", "Description"];
    }
  }
  fetchAllTicketsInView(userID : any){
  this.ticketService.fetchAllTickets().subscribe((data:any) => {
    this.tickets = data.data;
    this.getHeader();
  })
  }

  show: boolean = false;

  updateTicket(id:any){
    const ticket = this.tickets.find(t => t.ticketID === id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      ticket
    };
    const dialogRef = this.dialog.open(UpdateListComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.dialog.closeAll();
      this.router.navigate(['/user-dashboard']);
      this.show = true;
    });
  }
  deleteTicket(id:any){
    // show dialog pop up if he wants to delete the ticket
    if(confirm("Are you sure you want to delete this ticket#" + id +"?")){
      this.ticketService.deleteTicket(id).subscribe(() => {
        this.dialog.closeAll();
      })
    }

  }

}
