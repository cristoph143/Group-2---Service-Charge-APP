import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css']
})
export class UpdateListComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<any>();
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private ticketService: TicketService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ticket: FormGroup = new FormGroup({
    ticketID: new FormControl(''),
    assigneeID: new FormControl(''),
    status: new FormControl(''),
    subject: new FormControl(''),
    description: new FormControl(''),
  });

    
  tickets: any;
  account$: any;
  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.username = this.authService.username;
    console.log(this.username)
    this.getInfoUsingUsername(this.username);
    console.log(this.data)
    this.tickets = this.data
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

  updateTicket() {
    console.log(this.ticket.value)
    console.log(this.tickets.ticket.ticketID)
    let formData : FormData = new FormData();
    
    formData.append('ticketID', this.tickets.ticket.ticketID.toString());
    formData.append('assignee', this.ticket.value.assigneeID.toString());
    formData.append('status', this.ticket.value.status.toString());
    formData.append('subject', this.ticket.value.subject.toString());
    formData.append('description', this.ticket.value.description.toString());

    this.ticketService.updateTicket(this.tickets.ticket.ticketID, formData).subscribe((data:any) => {
      console.log(data);
      alert(data.message);
      // close all
      this.dialog.closeAll();
    })
  }

}
