import { Users } from '../../auth/model/user-interface';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../auth/model/ticket-interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { TicketService } from 'src/app/auth/services/ticket.service';

export interface List {
  path: string;
  icon: string;
  name: string;
}
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

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
    console.log(this.username)
    this.getInfoUsingUsername(this.username);
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

  list: List[] = [
    // ["ticket_list", "create_list", "update_list", "view_ticket", "aging_ticket", "ticket_workflow"];
    { path: '/ticket_list', icon: 'list', name: 'Ticket List' },
    // { path: '/create_list', icon: 'add', name: 'Create Ticket' },
    // { path: '/update_list', icon: 'update', name: 'Update Ticket' },
    // { path: '/view_ticket', icon: 'view_list', name: 'View Ticket' },
    { path: '/aging_ticket', icon: 'watch_later', name: 'Aging Ticket' },
    { path: '/ticket_workflow', icon: 'workflow', name: 'Ticket Workflow' },
    { path: '/ticket_management', icon: 'ticket', name: 'TICKET MANAGEMENT' },
    { path: '/reports', icon: 'report', name: 'REPORTS' },
    { path: '/user_role_mgt', icon: 'ticket', name: 'USER/ROLE MANAGEMENT' },

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
}
