import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
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
  ngOnInit(): void {
    console.log(this.data)
    this.tickets = this.data.datas
    console.log(this.tickets)
  }

  header = ["TicketID", "AssigneeID", "Status", "Subject", "Description"];

  show: boolean = false;

  updateTicket(id:any){
    console.log(this.tickets);
    const ticket = this.tickets.find(t => t.ticketID === id);
    console.log(ticket);
    // open the dialog box
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      ticket
    };
    console.log(dialogConfig.data, 'dialogConfig.data');
    const dialogRef = this.dialog.open(UpdateListComponent, dialogConfig);
    console.log(dialogRef)
    //   const dialogRef = this.dialog.open(dialogReference);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.dialog.closeAll();
      this.router.navigate(['/user-dashboard']);
      this.show = true;
    });
    console.log(this.show)
    // 
  }
  deleteTicket(id:any){
    // show dialog pop up if he wants to delete the ticket
    if(confirm("Are you sure you want to delete this ticket#" + id +"?")){
      this.ticketService.deleteTicket(id).subscribe(() => {
        // this.fetchAllTickets();
        // close
        this.dialog.closeAll();
      })
    }

  }

}
