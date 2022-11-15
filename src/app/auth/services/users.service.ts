import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../model/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: Users[]=[];
  constructor(private http: HttpClient) { }
  
  private url = "http://localhost:8000/ticket-system";

  httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
}
