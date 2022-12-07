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
      .get<Ticket>(`${this.url}/ticket-system/all-tickets`, this.httpOptions)
      .pipe(
        first(),
        catchError(
            this.errorHandlerService.handleError<Ticket>("fetchTicket")
        )
    );
  }

  // createTicket
  createTicket(data: any){
    return this.http
      .post(`${this.url}/ticket-system/create`, data)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Ticket>("createTicket")
        )
      );
  }

  // updateTicket
  public updateTicket(ticketID: any, data: any){
    return this.http
      .post(`${this.url}/ticket-system/ticket/update/${ticketID}`, data
      );
  }


  // deleteTicket
  deleteTicket(ticketID: any): Observable<Ticket> {
    return this.http
      .delete<Ticket>(`${this.url}/ticket-system/delete/${ticketID}`, {responseType: 'text' as 'json'})
  }

  // monthlyReport
  monthlyReport(): Observable<Ticket> {
    return this.http
      .get<Ticket>(`${this.url}/monthly-report`, this.httpOptions)
      .pipe(
        first(),
        catchError(
            this.errorHandlerService.handleError<Ticket>("monthlyReport")
        )
    );
  }

  // ticketPerAssignee
  ticketPerAssignee(): Observable<Ticket> {
    return this.http
      .get<Ticket>(`${this.url}/ticket-per-assignee`, this.httpOptions)
      .pipe(
        first(),
        catchError(
            this.errorHandlerService.handleError<Ticket>("ticketPerAssignee")
        )
    );
  }

  findTicketsPerAssigneeAndStatus(assigneeID: string, status: string): Observable<Ticket> {
    return this.http
      .get<Ticket>(`${this.url}/ticket-system/findByAssigneeID/${assigneeID}/${status}`, this.httpOptions)
      .pipe(
          first(),
          catchError(
              this.errorHandlerService.handleError<Ticket>("findTicketsPerAssigneeAndStatus")
          )
      );
    }

}
