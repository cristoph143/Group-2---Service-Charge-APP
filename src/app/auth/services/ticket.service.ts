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
  
  private url = "http://localhost:8080/ticket-system";

  httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  // fetchAllTickets
  fetchAllTickets(): Observable<Ticket> {
    return this.http
      .get<Ticket>(`${this.url}`, this.httpOptions)
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
      .post<Ticket>(`${this.url}`, ticket, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Ticket>("createTicket")
        )
      );
  }
}
