import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    console.log(this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
      console.log('?????',this.isAuthenticated)
    }))
    // this.isAuthenticated = this.authService.isUserLoggedIn$;
    console.log('hello', this.isAuthenticated);

  }
  
  isAuthenticated = false;

  nav(dest: string) {
    this.router.navigate([dest]);
  }

  todashboard(){
    this.router.navigate(["/user-dashboard"]);
  }

  logout(): void {
    localStorage.removeItem("token");
    // const remove = this.authService.isUserLoggedIn$.next(false);
    const remove: any = this.authService.isUserLoggedIn$.next(false);
    // this.authService.isUserLoggedIn$ = false;
    this.isAuthenticated = remove;
    this.router.navigate(["login"]);
  }
}

