import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/auth/model/ticket-interface';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { CreateListComponent } from '../create-list/create-list.component';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import { UpdateListComponent } from '../update-list/update-list.component';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private ticketService: TicketService,
    public dialog: MatDialog
    ) { }

    @Input() user: any;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    tickets: Ticket[] = [];
    dataSource:any;
    
    ngAfterViewInit() {
      this.dataSource = new MatTableDataSource<Ticket>(this.tickets);
      this.dataSource.paginator = this.paginator;
    }
    
    account$: any;
    ngOnInit(): void {
      // this.userId = this.authService.userId;
    this.username = this.authService.username;
    this.getInfoUsingUsername(this.username);
    this.fetchAllTickets(this.user);
    
  }

  userId: Pick<Users, "username"> | undefined;
  username: any;

  getInfoUsingUsername(username: any) {
    let res: never[] = [];
    this.userService
      .fetchAccountUsingUsername(
        username
    )
      .subscribe((data:any) => {
        res = data;
        this.getAcc(res);
      }
    );
  }

  getAcc(res:any) {
    const curr_acc = res;
    this.account$ = curr_acc;
  }

  header : any;

  getHeader(){
    //if admin naay assigneeID
    if(this.account$.roleID == 102){
      this.header = ["TicketID", "AssigneeID", "Status", "Subject", "Description"];
    }else{
      this.header = ["TicketID", "Status", "Subject", "Description"];
    }
  }

   
  fetchAllTickets(user: any){
    if(user.roleID == 101){
    this.ticketService.fetchAllTickets().subscribe((data:any) => {
      this.tickets = data.data;
      this.getHeader();
    })
    }else{
      this.ticketService.fetchAllTicketsByID(user.userID).subscribe((data:any) => {
        this.tickets = data.data;
        this.getHeader();
      })
    }
  }

  createTicket(){
    const ticket = this.tickets;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      ticket
    };
    const dialogRef = this.dialog.open(CreateListComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.dialog.closeAll();
      this.router.navigate(['/user-dashboard']);
      this.fetchAllTickets(this.user);
      // refresh content o
    });
  }
  updateTicket(id:any){
    const ticket = this.tickets.find(t => t.ticketID === id);
    // open the dialog box
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      ticket
    };
    const dialogRef = this.dialog.open(UpdateListComponent, dialogConfig);
    //   const dialogRef = this.dialog.open(dialogReference);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.dialog.closeAll();
      this.router.navigate(['/user-dashboard']);
      this.fetchAllTickets(this.user);
      // refresh content o
    });
    // 
  }
  deleteTicket(id:any){
    // show dialog pop up if he wants to delete the ticket
    if(confirm("Are you sure you want to delete this ticket#" + id +"?")){
      this.ticketService.deleteTicket(id).subscribe(() => {
        this.fetchAllTickets(this.user);
      })
    }

  }
  

 
  
  exportToCSV(){
    // export tickets to csv file
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    // push the this.headers to headers
    const header = Object.keys(this.tickets[0])
    // from this.tickets get the values and push it to the rows
    const csv = this.tickets.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'ticket_list_file.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
