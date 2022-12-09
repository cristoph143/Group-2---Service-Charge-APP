import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserRoleService } from 'src/app/auth/services/user-role.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-create-user-role',
  templateUrl: './create-user-role.component.html',
  styleUrls: ['./create-user-role.component.css']
})
export class CreateUserRoleComponent {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    public dialog: MatDialog,
    private userRoleService: UserRoleService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  userRoles: any;
  account$: any;
  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.username = this.authService.username;
    console.log(this.username)
    this.getInfoUsingUsername(this.username);
  }

  userRole: FormGroup = new FormGroup({
    roleID: new FormControl(''),
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

  attachmentList:any = [];
  createUser() {
    let formData : FormData = new FormData();

    formData.append('description', this.userRole.value.description.toString());

    this.userRoleService.createUserRole(formData).subscribe((data:any) => {
      console.log(data);
      alert(data.message)
      // close all
      this.dialog.closeAll();
      this.router.navigate['/user-role-management'];
    })

    
  }
}
