import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ticket } from './museum';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private tickets: Ticket[] = [];

  constructor() {}

  getAllTickets(): Observable<Ticket[]> {
    return of(this.tickets);
  }

  createTicket(newTicket: Ticket): Observable<Ticket> {
    const nextId = this.getNextId(); 
    newTicket.id = nextId;
    this.tickets.push(newTicket);
    return of(newTicket);
  }

  updateTicket(updatedTicket: Ticket): Observable<boolean> {
    const index = this.tickets.findIndex((b) => b.id === updatedTicket.id);
    if (index !== -1) {
      this.tickets[index] = updatedTicket;
      return of(true); 
    }
    return of(false); 
  }

  deleteTicket(ticketId: number): Observable<boolean> {
    const index = this.tickets.findIndex((b) => b.id === ticketId);
    if (index !== -1) {
      this.tickets.splice(index, 1);
      return of(true);
    }
    return of(false); 
  }

  private getNextId(): number {
    const maxId = this.tickets.reduce(
      (max, ticket) => (ticket.id > max ? ticket.id : max),
      0
    );
    return maxId + 1;
  }
}
