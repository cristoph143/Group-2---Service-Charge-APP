import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/auth/model/ticket-interface';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { ViewTicketPerAssigneeComponent } from 'src/app/users/view-ticket-per-assignee/view-ticket-per-assignee.component';

@Component({
  selector: 'app-aging-ticket',
  templateUrl: './monthly-reports.component.html',
  styleUrls: ['./monthly-reports.component.css']
})
export class MontlyReportsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private ticketService: TicketService,
    public dialog: MatDialog
    ) { }
    
  tickets: Ticket[] = [];
  dataSource:any;
  tickets_monthly: any;
  tickets_assignee: any;
  account$: any;
  monthly:any;
  monthlyJson: any
  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.username = this.authService.username;
    console.log(this.username)
    this.getInfoUsingUsername(this.username);
    this.monthlyReport();
    this.ticketPerAssignee();
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

  monthlyReport() {
    this.ticketService.monthlyReport().subscribe((data:any) => {
      this.tickets_monthly = data;
      console.log(this.tickets_monthly);
    });
  }

  ticketPerAssignee(){
    this.ticketService.ticketPerAssignee().subscribe((data:any) => {
      this.tickets_assignee = data;
      console.log(this.tickets_assignee);
    });
  }

  viewTicket(assigneeID: any,status: any){
    this.ticketService.findTicketsPerAssigneeAndStatus(assigneeID,status).subscribe((data:any) => {
      const datas = data.data;
      
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "100%";
      dialogConfig.data = {
        datas
      };
      console.log(dialogConfig.data, 'dialogConfig.data');
      const dialogRef = this.dialog.open(ViewTicketPerAssigneeComponent, dialogConfig);
      console.log(dialogRef)
      //   const dialogRef = this.dialog.open(dialogReference);

      dialogRef.afterClosed().subscribe((result: any) => {
        console.log(`Dialog result: ${result}`);
        this.dialog.closeAll();
        console.log(this.monthlyReport())
        this.ticketPerAssignee();
      });

    });
  }

  // header = ["TicketID", "AssigneeID", "Status", "Subject", "Description"];
  header = ["Status", "Count", "TicketID", "AssigneeID", "Status", "Count"];
  
  exportToCSV(){
    // export tickets to csv file
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    // push the this.headers to headers
    const header = Object.keys(this.tickets[0])
    console.log(header)
    console.log(this.tickets);
    // from this.tickets get the values and push it to the rows
    const csv = this.tickets.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
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
