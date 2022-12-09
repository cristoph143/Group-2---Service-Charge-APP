import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as e from 'cors';
import { firstValueFrom, Observable } from 'rxjs';
import { Ticket } from 'src/app/auth/model/ticket-interface';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-aging-list',
  templateUrl: './aging-list.component.html',
  styleUrls: ['./aging-list.component.css']
})
export class AgingListComponent {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private ticketService: TicketService,
    public dialog: MatDialog
    ) { }

    @Input() user: any;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    tickets: Ticket[] = [];
    dataSource:any;

    ngAfterViewInit() {
      this.dataSource = new MatTableDataSource<Ticket>(this.tickets);
      this.dataSource.paginator = this.paginator;
      
    }

    account$: any;
    ngOnInit(): void{
      // this.userId = this.authService.userId;
    this.username = this.authService.username;
    console.log(this.username)
    console.log(this.user, "GIPASA")
  
    this.getInfoUsingUsername(this.username)
    this.fetchAllAgingTickets(this.user);
    
    }

    


    userId: Pick<Users, "username"> | undefined;
    username: any;
    header: any;
  
  getInfoUsingUsername(username: any) {
      console.log(username, 'username');
      let res: never[] = [];
      // return this.accService.fetchAccount(username);
      this.userService
        .fetchAccountUsingUsername(
          username
      ).subscribe((data:any) => {
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
      console.log(this.account$.roleID, 'account$ YAWA');
      
    }

    fetchAllAgingTickets(user: any){
      console.log(this.account$, "KAABOT KA DIRI?2")      
      if(user.roleID == 101){
        this.ticketService.fetchAllAgingTickets().subscribe((data:any) => {
          this.tickets = data.data; 
          console.log(this.account$, "KAABOT KA DIRI?1")     
          this.getHeader();
        })
      }
      else{
        this.ticketService.fetchAllAgingTicketsByID(user.userID).subscribe((data:any) => {
          this.tickets = data.data;
          console.log(this.tickets, "KAABOT KA DIRI?2")   
          this.getHeader();   
        })
      }


      
    }

    
    getHeader(){
      //if admin naay assigneeID
      if(this.account$.roleID == 101){
        this.header = ["TicketID", "AssigneeID", "Status", "Subject", "Description"];
      }else{
        this.header = ["TicketID", "Status", "Subject", "Description"];
      }
      //if di kay wala
    }

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
      a.download = 'aging_list_file.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }
}