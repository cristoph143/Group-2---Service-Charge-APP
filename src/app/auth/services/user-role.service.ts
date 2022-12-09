import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, catchError } from 'rxjs';
import { Ticket } from '../model/ticket-interface';
import { UserRole } from '../model/user-role-interface';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  userRole: UserRole[] = [];

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  private url = "http://localhost:8080/ticket-system";
  
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  // fetchAllUserRoles
  fetchAllUserRoles(): Observable<UserRole> {
    return this.http
      .get<UserRole>(`${this.url}/all-roles`, this.httpOptions)
      .pipe(
        first(),
        catchError(
            this.errorHandlerService.handleError<UserRole>("fetchUserRole")
        )
    );
  }

  // deleteTicket
  deleteTicket(userRoleID: any): Observable<UserRole> {
    return this.http
      .delete<UserRole>(`${this.url}/user_role/delete/${userRoleID}`, {responseType: 'text' as 'json'})
  }

}
