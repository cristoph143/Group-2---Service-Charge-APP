import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
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
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    })
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
    const remove: any = this.authService.isUserLoggedIn$.next(false);
    this.isAuthenticated = remove;
    this.router.navigate(["login"]);
  }
}

