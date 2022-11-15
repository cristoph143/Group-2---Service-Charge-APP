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

  private url = "http://localhost:8000/ticket-system/auth"

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  // isUserLoggedIn$ = false;
  userId: Pick<Users, "id"> | undefined;
  id: any;
  httpOptions: {
    headers : HttpHeaders
  } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  
  signup(user: Omit<Users,"id">): Observable<Users>{
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
    id: Pick<Users, "id">,
    password: Pick<Users, "password">
  ): Observable<{
    token: string,
    userid: Pick<Users, "id">
  }> {
    console.log('login');
    const user = this.http
      .post(
        `${this.url}/login`,
        {
          id,
          password
        },
        this.httpOptions
      )
      .pipe(
        first(),
        tap((tokenObject: any) => {
          this.userId = tokenObject.userid;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          // this.isUserLoggedIn$ = true;
          this.id = id;
          console.log('sdd=>',this.id);
          this.router.navigate(["home"]);
          // alert("Successfully logged in");
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string,
            userid: Pick<Users, "id">
          }>()
        ),
    ) 
    this.currUser = user;
    console.log(this.currUser,"djsjsdj");
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
