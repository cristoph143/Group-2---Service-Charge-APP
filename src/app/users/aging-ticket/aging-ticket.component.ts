import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-aging-ticket',
  templateUrl: './aging-ticket.component.html',
  styleUrls: ['./aging-ticket.component.css']
})
export class AgingTicketComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private ticketService: TicketService
    ) { }

  tickets: any;
  account$: any;
  monthly:any;
  monthlyJson: any
  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.username = this.authService.username;
    console.log(this.username)
    this.getInfoUsingUsername(this.username);
    this.monthlyReport();
    this.ticketPerAssignee();
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

  monthlyReport() {
    this.ticketService.monthlyReport().subscribe((data:any) => {
      this.tickets = data;
      console.log(this.tickets);
    });
  }

  ticketPerAssignee(){
    this.ticketService.ticketPerAssignee().subscribe((data:any) => {
      this.tickets = data;
      console.log(this.tickets);
    });
  }

}
