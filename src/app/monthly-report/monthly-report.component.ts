import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private router: Router,
    private ticketService: TicketService,
    public dialog: MatDialog
    ) { }

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
  

}
