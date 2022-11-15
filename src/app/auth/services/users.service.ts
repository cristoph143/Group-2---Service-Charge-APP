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
}
