import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  
  isAuthenticated = false;

  nav(dest: string) {
    this.router.navigate([dest]);
  }

  logout(){
    this.isAuthenticated = false;
    this.nav('login');
  }
}
