import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';
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
  
    @ViewChild(MatPaginator) paginator: MatPaginator;

  tickets: any;
  account$: any;
  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.username = this.authService.username;
    console.log(this.username)
    this.getInfoUsingUsername(this.username);
    this.fetchAllTickets();
  }

  userId: Pick<Users, "username"> | undefined;
  username: any;

  getInfoUsingUsername(username: any) {
    console.log(username, 'username');
    let res: never[] = [];
    // return this.accService.fetchAccount(username);
    this.userService
      .fetchAccountUsingUsername(
        username
    )
      .subscribe((data:any) => {
        console.log(data);
        res = data;
        this.getAcc(res);
      }
    );
  }

  getAcc(res:any) {
    console.log(res)
    const curr_acc = res;
    console.log(curr_acc, 'curr_acc');
    this.account$ = curr_acc;
    console.log(this.account$, 'account$');
  }

   
  fetchAllTickets(){
    this.ticketService.fetchAllTickets().subscribe((data:any) => {
      this.tickets = data;
    })
  }

  createTicket(){
  }
  updateTicket(id:any){
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
    });
  }
  deleteTicket(id:any){}
  viewTicket(id:any){}

}
