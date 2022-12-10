import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { CreateUserRoleComponent } from '../create-user-role/create-user-role.component';

export interface List {
  path: string;
  icon: string;
  name: string;
}

@Component({
  selector: 'app-menu-user-role',
  templateUrl: './menu-user-role.component.html',
  styleUrls: ['./menu-user-role.component.css']
})
export class MenuUserRoleComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  users: any;
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
    { path: '/user-role-list', icon: 'list', name: 'USER ROLE LIST' },
    { path: '/user-list', icon: 'list', name: 'USER LIST'}
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

  createUser() {
    const users = this.users;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      users
    };
    const dialogRef = this.dialog.open(CreateUserComponent, dialogConfig);
    //   const dialogRef = this.dialog.open(dialogReference);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.dialog.closeAll();
      this.router.navigate(['/user-dashboard']);
      // refresh content o
    });
  }

  createUserRole() {
    const users = this.users;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      users
    };
    const dialogRef = this.dialog.open(CreateUserRoleComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.dialog.closeAll();
      this.router.navigate(['/user-dashboard']);
    });
  }

}
