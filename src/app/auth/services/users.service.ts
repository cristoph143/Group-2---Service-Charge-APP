import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../model/user-interface';
import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: Users[]=[];
  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }
  
  private url = "http://localhost:8080/ticket-system";

  httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  // fetchAccount using username
  fetchAccountUsingUsername(username: Pick<Users, "username">): Observable<Users> {
    return this.http
        .get<Users>(`${this.url}/fetchUsername/${username}`, this.httpOptions)
        .pipe(
            first(),
            catchError(
                this.errorHandlerService.handleError<Users>("fetchAccount")
            )
        );
  }

   // fetchAllUsers
   fetchAllUsers(): Observable<Users> {
    return this.http
      .get<Users>(`${this.url}/all-users`, this.httpOptions)
      .pipe(
        first(),
        catchError(
            this.errorHandlerService.handleError<Users>("fetchTicket")
        )
    );
  }

   // createUser
   createUser(data: any){
    return this.http
      .post(`${this.url}/user/create`, data)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Users>("createTicket")
        )
      );
  }

  // updateUser
  public updateUser(userID: any, data: any){
    return this.http
      .post(`${this.url}/user/update/${userID}`, data
      );
  }

  // deleteUser
  deleteUser(userID: any): Observable<Users> {
    return this.http
      .delete<Users>(`${this.url}/user/delete/${userID}`, {responseType: 'text' as 'json'})
  }
}
