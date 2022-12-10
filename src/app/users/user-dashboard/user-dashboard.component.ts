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
    this.getInfoUsingUsername(this.username);
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

  list: List[] = [
    { path: '/ticket_list', icon: 'list', name: 'Ticket List' },
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

  goToTicketMgt() {
    this.router.navigate(["/ticket-management"]);
  }

  goToReports() {
    this.router.navigate(["/reports"]);
  }

  goToUserRoleMgt() {
    this.router.navigate(["/user-role-management"]);
  }
}
