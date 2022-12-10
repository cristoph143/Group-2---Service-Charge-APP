import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { UserRole } from 'src/app/auth/model/user-role-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UserRoleService } from 'src/app/auth/services/user-role.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { EditUserRoleComponent } from '../edit-user-role/edit-user-role.component';

@Component({
  selector: 'app-list-user-role',
  templateUrl: './list-user-role.component.html',
  styleUrls: ['./list-user-role.component.css']
})
export class ListUserRoleComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private userRoleService: UserRoleService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  userRoles: UserRole[] = [];
  dataSource:any;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<UserRole>(this.userRoles);
    this.dataSource.paginator = this.paginator;
  }

  account$: any;
    ngOnInit(): void {
    this.username = this.authService.username;
    this.getInfoUsingUsername(this.username);
    this.fetchAllUserRoles();

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

  header = ["Role ID", "Description"];

  fetchAllUserRoles(){
    this.userRoleService.fetchAllUserRoles().subscribe((data:any) => {
      this.userRoles = data.data;
    })
  }

  deleteUserRole(id:any){
    // show dialog pop up if he wants to delete the user role
    if(confirm("Are you sure you want to delete this role#" + id +"?")){
      this.userRoleService.deleteUserRole(id).subscribe(() => {
        this.fetchAllUserRoles();
      })
    }
  }

  updateUserRole(id:any){
    const ticket = this.userRoles.find(t => t.roleID === id);
    // open the dialog box
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      ticket
    };
    const dialogRef = this.dialog.open(EditUserRoleComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.dialog.closeAll();
      this.router.navigate(['/user-dashboard']);
      this.fetchAllUserRoles();
    });
  }



  exportToCSV(){
    // export tickets to csv file
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    // push the this.headers to headers
    const header = Object.keys(this.userRoles[0])
    // from this.tickets get the values and push it to the rows
    const csv = this.userRoles.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'user_role_file.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

} 
