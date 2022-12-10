import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MonthlyReport } from '../auth/model/monthly-report';
import { Users } from '../auth/model/user-interface';
import { AuthService } from '../auth/services/auth.service';
import { TicketService } from '../auth/services/ticket.service';
import { UsersService } from '../auth/services/users.service';
import { ViewTicketPerAssigneeComponent } from '../users/view-ticket-per-assignee/view-ticket-per-assignee.component';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private ticketService: TicketService,
    public dialog: MatDialog
    ) { }
    
    // tickets: Ticket[] = [];
    monthly_report: MonthlyReport[] = [];
    tickets_monthly: any;
    tickets_assignee: any;
    account$: any;
    monthly:any;
    monthlyJson: any
    ngOnInit(): void {
      this.username = this.authService.username;
      this.getInfoUsingUsername(this.username);
      this.monthlyReport();
      this.ticketPerAssignee();
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

  monthlyReport() {
    this.ticketService.monthlyReport().subscribe((data:any) => {
      this.tickets_monthly = data;
    });
  }

  ticketPerAssignee(){
    this.ticketService.ticketPerAssignee().subscribe((data:any) => {
      this.tickets_assignee = data;
    });
  }

  viewTicket(assigneeID: any,status: any){
    this.ticketService.findTicketsPerAssigneeAndStatus(assigneeID,status).subscribe((data:any) => {
      const datas = data.data;
      const user = this.account$;    
      
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "100%";
      dialogConfig.data = {
        datas,
        user
      };
      const dialogRef = this.dialog.open(ViewTicketPerAssigneeComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result: any) => {
        this.dialog.closeAll();
        this.ticketPerAssignee();
      });

    });
  }
  header = ["Status", "Count"];
  
  exportToCSV(){
    // export tickets to csv file
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    // push the this.headers to headers
    const header = Object.keys(this.tickets_monthly[0])
    // from this.tickets get the values and push it to the rows
    const csv = this.tickets_monthly.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'monthly_report_file.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  

}
