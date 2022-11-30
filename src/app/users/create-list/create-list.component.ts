import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private ticketService: TicketService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  tickets: any;
  account$: any;
  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.username = this.authService.username;
    console.log(this.username)
    this.getInfoUsingUsername(this.username);
  }

  ticket: FormGroup = new FormGroup({
    ticketID: new FormControl(''),
    assigneeID: new FormControl(''),
    status: new FormControl(''),
    subject: new FormControl(''),
    description: new FormControl(''),
  });

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

  createTicket() {
    console.log(this.ticket.value)
    let ticket = {
      assigneeID: this.ticket.value.assigneeID,
      status: this.ticket.value.status,
      subject: this.ticket.value.subject,
      description: this.ticket.value.description
    }
    console.log(ticket)
    this.ticketService.createTicket(ticket).subscribe((data:any) => {
      console.log(data);
      alert(data)
      // close all
      this.dialog.closeAll();
    })
  }

}
