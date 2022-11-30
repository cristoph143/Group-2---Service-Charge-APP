import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private ticketService: TicketService
    ) { }

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
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

  addTicket(){
  }
  updateTicket(id:any){}
  deleteTicket(id:any){}
  viewTicket(id:any){}

}
