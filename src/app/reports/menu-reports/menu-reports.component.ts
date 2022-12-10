import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';

export interface List {
  path: string;
  icon: string;
  name: string;
}

@Component({
  selector: 'app-menu-reports',
  templateUrl: './menu-reports.component.html',
  styleUrls: ['./menu-reports.component.css']
})
export class MenuReportsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private ticketService: TicketService
  ) { }

  tickets: any;
  account$: any;

  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.username = this.authService.username;
    this.getInfoUsingUsername(this.username);
  }

  userId: Pick<Users, "username"> | undefined;
  username: any;

  getInfoUsingUsername(username: any) {
    let res: never[] = [];
    // return this.accService.fetchAccount(username);
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

  list: List[] = [
    { path: '/ticket_list', icon: 'list', name: 'TICKET LIST' },
    { path: '/aging_ticket', icon: 'watch_later', name: 'AGING TICKET' },
    { path: '/monthly_report', icon: 'month', name: 'MONTHLY REPORT' },
  ];

  paths: any;
  tab(path: any){
    // loop this.list.path if equal to path
    for(let i=0; i<this.list.length; i++){
      if(this.list[i].path == path){
        this.paths = this.list[i].path;
      }
    }
  }

  fetchAllTickets(){
    this.ticketService.fetchAllTickets().subscribe((data:any) => {
      this.tickets = data;
    })
  }
}
