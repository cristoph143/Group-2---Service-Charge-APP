import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from '../model/ticket-interface';
import { ErrorHandlerService } from './error-handler.service';
import { catchError, first } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  tickets: Ticket[]=[];
  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }
  
  private url = "http://localhost:8080";

  httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  // fetchAllTickets
  fetchAllTickets(): Observable<Ticket> {
    return this.http
      .get<Ticket>(`${this.url}/ticket-system/`, this.httpOptions)
      .pipe(
        first(),
        catchError(
            this.errorHandlerService.handleError<Ticket>("fetchTicket")
        )
    );
  }

  // createTicket
  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http
      .post<Ticket>(`${this.url}/create_ticket`, ticket, {responseType: 'text' as 'json'})
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Ticket>("createTicket")
        )
      );
  }

  // updateTicket
  updateTicket(ticketID: any, ticket: Ticket): Observable<Ticket> {
    console.log(ticket);
    return this.http
      .post<Ticket>(`${this.url}/update_ticket/${ticketID}`,
      ticket, {responseType: 'text' as 'json'})
  }

  // deleteTicket
  deleteTicket(ticketID: any): Observable<Ticket> {
    return this.http
      .delete<Ticket>(`${this.url}/ticket-system/delete/${ticketID}`, {responseType: 'text' as 'json'})
  }
}
