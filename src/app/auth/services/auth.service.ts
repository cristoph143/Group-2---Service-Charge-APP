import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Users } from '../model/user-interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
  
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  private url = "http://localhost:8080/ticket-system"

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  // isUserLoggedIn$ = false;
  userId: Pick<Users, "username"> | undefined;
  username: any;
  httpOptions: {
    headers : HttpHeaders
  } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  
  signup(user: Omit<Users,"username">): Observable<Users>{
    console.log('signup')
    console.log(user);
    return this.http
      .post<Users>(
        `${this.url}/signup`,
        user,
        this.httpOptions
      )
      .pipe(
        first(), //it will not need to unsubscribe from observable and it will just give back the first response...
        catchError(this.errorHandlerService.handleError<Users>("signup"))
      )
  }

  currUser: any;

  login(
    username: Pick<Users, "username">,
    password: Pick<Users, "password">
  ): Observable<{
    token: string,
    username: Pick<Users, "username">
  }> {
    console.log('login');
    const user = this.http
      .post(
        `${this.url}/login`,
        {
          username,
          password
        },
        this.httpOptions
      )
      .pipe(
        first(),
        tap((tokenObject: any) => {
          this.username = tokenObject.username;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          // this.isUserLoggedIn$ = true;
          this.username = username;
          console.log('sdd=>',this.username);
          this.router.navigate(["user-dashboard"]);
          // alert("Successfully logged in");
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string,
            username: Pick<Users, "username">
          }>()
        ),
    ) 
    this.currUser = user;
    console.log(this.currUser,"djsjsdj");
    
    console.log('username' + this.username);
    return this.currUser;
  }

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  getLoggedUser(): Users {
      // Perform localStorage action
      const item = localStorage.getItem('token');
      // if item is not null return parse
      return item ? JSON.parse(item) : null;
    // return JSON.parse(localStorage.getItem("token", null));
  }

  isUserAuthenticated(): boolean {
    console.log(!!localStorage.getItem("token"));
    return !!localStorage.getItem("token");
  }
}
