import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MuseumService } from '../museum.service';
import { TicketsService } from '../tickets.service';
import { ExcursionService } from '../excursion.service';
import { Excursion, Museum, Ticket } from '../museum';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  providers: [MuseumService, TicketsService, ExcursionService]
})
export class TicketComponent implements OnInit {
  newTicketForm: FormGroup;
  museums: Museum[] = [];
  excursions: Excursion[] = [];
  filteredexcursions: Excursion[] = [];
  tickets: Ticket[] = [];
  editingTicket: Ticket | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private museumService: MuseumService,
    private excursionService: ExcursionService,
    private ticketService: TicketsService
    
  ) {
    this.newTicketForm = this.formBuilder.group({
      museumId: ['', Validators.required],
      excursionId: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });
  }

  selectedMuseum: Museum | undefined;
  ngOnInit(): void {
    this.getAllMuseums();
    this.getAllExcursions();
    this.getAllTickets();
  }

  getAllMuseums(): void {
    this.museumService.getAllMuseums().subscribe((museums) => {
      this.museums = museums;
    });
  }

  getAllExcursions(): void {
    this.excursionService.getAllExcursions().subscribe((excursions) => {
      this.excursions = excursions;
    });
  }

  getAllTickets(): void {
    this.ticketService.getAllTickets().subscribe((tickets) => {
      this.tickets = tickets;
    });
  }

  filterTicketsByMuseum(museumId: number): Excursion[] {
    for (let r in this.excursions) {
      if (this.excursions[r].museumId == museumId) {
        this.filteredexcursions.push(this.excursions[r]);
      }
    }
    return this.filteredexcursions;
  }

  onMuseumChange(): void {
    const selectedMuseumId = this.newTicketForm.value.museumId;
    this.filteredexcursions = [];
    this.filteredexcursions = this.filterTicketsByMuseum(selectedMuseumId);
    
  }

  createTicket(): void {
    if (this.newTicketForm.valid) {
      const newTicket: Ticket = {
        id: 0,
        clientId: 1,
        museumId: this.newTicketForm.value.museumId,
        excursionId: this.newTicketForm.value.excursionId,
        checkInDate: this.newTicketForm.value.checkInDate,
        checkOutDate: this.newTicketForm.value.checkOutDate,
        status: 'Забронировано',
      };

      this.ticketService
        .createTicket(newTicket)
        .subscribe((createdTicket) => {
          this.newTicketForm.reset();
        });
    }
  }

  updateTicket(ticket: Ticket): void {
    this.ticketService.updateTicket(ticket).subscribe((success) => {
      if (success) {
        this.getAllTickets();
      } else {
        console.error('Failed to update booking');
      }
    });
  }

  deleteTicket(ticketId: number): void {
    this.ticketService
      .deleteTicket(ticketId)
      .subscribe((deleted: boolean) => {
        if (deleted) {
          console.log('Бронирование успешно удалено');
        } else {
          console.log('Бронирование не найдено');
        }
      });
  }

  editTicket(ticket: Ticket): void {
    this.editingTicket = ticket;
    this.newTicketForm.patchValue({
      museumId: ticket.museumId,
      excursionId: ticket.excursionId,
      checkInDate: ticket.checkInDate,
      checkOutDate: ticket.checkOutDate,
    });
    this.filteredexcursions = this.filterTicketsByMuseum(ticket.museumId);
  }

  saveTicket(): void {
    if (this.newTicketForm.valid && this.editingTicket) {
      this.editingTicket.museumId = this.newTicketForm.value.museumId;
      this.editingTicket.excursionId = this.newTicketForm.value.excursionId;
      this.editingTicket.checkInDate = this.newTicketForm.value.checkInDate;
      this.editingTicket.checkOutDate = this.newTicketForm.value.checkOutDate;
      this.updateTicket(this.editingTicket);
      this.editingTicket = null;
      this.newTicketForm.reset();
    }
  }

  cancelEdit(): void {
    this.editingTicket = null;
    this.newTicketForm.reset();
  }
}
