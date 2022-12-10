import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
// import * as saveAs from 'file-saver';
import { Users } from 'src/app/auth/model/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TicketService } from 'src/app/auth/services/ticket.service';
import { UsersService } from 'src/app/auth/services/users.service';
import { FileService } from 'src/app/auth/services/file.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private ticketService: TicketService,
    public dialog: MatDialog,
    // public fileService: FileService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  tickets: any;
  account$: any;
  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.username = this.authService.username;
    console.log(this.username)
    this.getInfoUsingUsername(this.username);
  }

  ticket: FormGroup = new FormGroup({
    ticketID: new FormControl(''),
    assigneeID: new FormControl(''),
    status: new FormControl(''),
    subject: new FormControl(''),
    description: new FormControl(''),
    file: new FormControl(''),
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
  createTicket() {
    console.log(this.ticket.value)
    let formData : FormData = new FormData();

    formData.append('assignee', this.ticket.value.assigneeID.toString());
    formData.append('status', this.ticket.value.status.toString());
    formData.append('subject', this.ticket.value.subject.toString());
    formData.append('description', this.ticket.value.description.toString());

    this.ticketService.createTicket(formData).subscribe((data:any) => {
      console.log(data);
      alert(data.message)
      // close all
      this.dialog.closeAll();
      this.router.navigate['/ticket-list'];
    })

    
  }

  // onFileSelected($event: Event) {
  //   console.log($event);

  //   const file = ($event.target as HTMLInputElement).files[0];
  //   console.log(file);
  //   this.ticket.patchValue({ image: file });
  //   this.ticket.get('image')?.updateValueAndValidity();
  //   console.log(this.ticket);
  // }

  
  // isLinear = false;
  // // download(index: string | number){
  // //   var filename = this.attachmentList[index].uploadname;

  // //   this.fileService.downloadFile(filename)
  // //   .subscribe(
  // //       (data: any) => {
  // //       // return saveAs(data, filename);
  // //     },
  // //       (error: any) => {
  // //         return console.error(error);
  // //       }
  // //   );
  // // }

  // selectFiles(event: any) {
  //   // if attachmentList has one file, then remove it
  //   if (this.attachmentList.length > 0) {
  //     this.attachmentList = [];
  //   }
  //   // insert to attachmentList
  //   for (var i = 0; i < event.target.files.length; i++) {
  //     this.attachmentList.push(event.target.files[i]);
  //   }
  //   console.log(this.attachmentList);
  //   console.log(this.attachmentList[0].name);
  // }

  // removeFile(_t18: any) {
  //   this.attachmentList = [];
  //   // clear the input file
  //   var fileInput = document.getElementById('file-input') as HTMLInputElement;
  //   fileInput.value = '';
  // }

  // uploadFiles() {
  //   for (var i = 0; i < this.attachmentList.length; i++) {
  //     this.upload(this.attachmentList[i]);
  //   }
  // }

  // uploading: boolean = false;
  // formData = new FormData();
  // progress: any;
  // ticket_id: string;
  
  // upload(file: any) {
  //   this.formData.append('file', file);
  //   const ticketID = this.random_uiD();
  //   this.ticket_id = ticketID;
  //   this.formData.append('research_id', ticketID);
  //   console.log(ticketID, 'upload');

  //   // this.fileService.uploadFile(this.formData).subscribe(
  //   //   (data: any) => {
  //   //     console.log(data);
  //   //   },
  //   //   (error: any) => {
  //   //     console.log(error);
  //   //   }
  //   // );
  // }

  // random_uiD() {
  //   let ticket_id = '';
  //   ticket_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //   });
  //   console.log(ticket_id, 'random_uiD');
  //   return ticket_id;
  // }

  // upNext(){
  //   console.log(this.formData.get('file'), 'upNext');
  //   console.log(this.formData.get('research_id'), 'upNext');
  // }
}
