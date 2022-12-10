import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { UserRole } from 'src/app/auth/model/user-role-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UserRoleService } from 'src/app/auth/services/user-role.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-edit-user-role',
  templateUrl: './edit-user-role.component.html',
  styleUrls: ['./edit-user-role.component.css']
})
export class EditUserRoleComponent {
  @Output() submitClicked = new EventEmitter<any>();
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private userRoleService: UserRoleService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  userRole: FormGroup = new FormGroup({
    roleID: new FormControl(''),
    description: new FormControl(''),
  });

  userRoles: any;
  account$: any;
  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.username = this.authService.username;
    this.getInfoUsingUsername(this.username);
    this.userRoles = this.data
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

  updateUserRole() {
    let formData : FormData = new FormData();
    
    formData.append('roleID', this.userRoles.ticket.roleID.toString());
    formData.append('description', this.userRole.value.description.toString());

    this.userRoleService.updateUserRole(this.userRoles.ticket.roleID, formData).subscribe((data:any) => {
      alert(data.message)
      this.dialog.closeAll();
    })
  }
}
