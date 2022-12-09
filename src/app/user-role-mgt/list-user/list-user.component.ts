import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  users: Users[] = [];
  dataSource: any;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Users>(this.users);
    this.dataSource.paginator = this.paginator;
  }

  account$: any;
    ngOnInit(): void {
      // this.userId = this.authService.userId;
    this.username = this.authService.username;
    console.log(this.username)
    this.getInfoUsingUsername(this.username);
    this.fetchAllUsers();
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

  header = ["User ID", "Role ID", "First Name", "Last Name", "Username", "Password"];

  fetchAllUsers(){
    this.userService.fetchAllUsers().subscribe((data:any) => {
      this.users = data.data;
    })
  }

  deleteUser(id:any){
    // show dialog pop up if he wants to delete the ticket
    if(confirm("Are you sure you want to delete this user#" + id +"?")){
      this.userService.deleteUser(id).subscribe(() => {
        this.fetchAllUsers();
      })
    }

  }

  exportToCSV(){
    // export tickets to csv file
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    // push the this.headers to headers
    const header = Object.keys(this.users[0])
    // from this.tickets get the values and push it to the rows
    const csv = this.users.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    console.table(csv)
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
