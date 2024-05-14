import { Routes } from '@angular/router';
import { MuseumComponent } from './museum/museum.component';
import { TicketComponent } from './ticket/ticket.component';
import { ExcursionComponent } from './excursion/excursion.component';

export const routes: Routes = [
    {path: 'museum', component: MuseumComponent},
    {path: 'ticket', component: TicketComponent},
    {path: 'excursion', component: ExcursionComponent},
];
