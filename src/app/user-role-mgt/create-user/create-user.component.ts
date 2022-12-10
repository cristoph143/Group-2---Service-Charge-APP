import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    public dialog: MatDialog,
    // public fileService: FileService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  users: any;
  account$: any;
  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.username = this.authService.username;
    console.log(this.username)
    this.getInfoUsingUsername(this.username);
  }

  user: FormGroup = new FormGroup({
    userID: new FormControl(''),
    roleID: new FormControl(''),
    fname: new FormControl(''),
    lname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

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

  attachmentList:any = [];
  createUser() {
    let formData : FormData = new FormData();

    formData.append('roleID', this.user.value.roleID.toString());
    formData.append('fname', this.user.value.fname.toString());
    formData.append('lname', this.user.value.lname.toString());
    formData.append('username', this.user.value.username.toString());
    formData.append('password', this.user.value.password.toString());

    this.userService.createUser(formData).subscribe((data:any) => {
      alert(data.message)
      this.dialog.closeAll();
      this.router.navigate['/user-role-management'];
    })

    
  }
}
