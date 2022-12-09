import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  @Output() submitClicked = new EventEmitter<any>();
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  user: FormGroup = new FormGroup({
    userID: new FormControl(''),
    roleID: new FormControl(''),
    fname: new FormControl(''),
    lname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  users: any;
  account$: any;
  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.username = this.authService.username;
    console.log(this.username)
    this.getInfoUsingUsername(this.username);
    console.log(this.data)
    this.users = this.data
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
    console.log(this.users.user.userID);
    let formData : FormData = new FormData();
    
    formData.append('userID', this.users.user.userID.toString());
    formData.append('roleID', this.user.value.roleID.toString());
    formData.append('fname', this.user.value.fname.toString());
    formData.append('lname', this.user.value.lname.toString());
    formData.append('username', this.user.value.username.toString());
    formData.append('password', this.user.value.password.toString());

    this.userService.updateUser(this.users.user.userID, formData).subscribe((data:any) => {
      console.log(data);
      alert(data.message)
      // close all
      this.dialog.closeAll();
    })
  }
}
