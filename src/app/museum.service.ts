import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Museum } from './museum';


@Injectable({
  providedIn: 'root',
})
export class MuseumService {
  public museums: Museum[] = [
    {
        id: 1,
        name: 'Музей 1',
        address: 'Московская 1, г. Москва',
        contactInfo: '8-977-777-77-77',
    },
    {
        id: 2,
        name: 'Музей 2',
        address: 'Самарская 2, г. Самара',
        contactInfo: '8-963-636-36-63',
    },
    {
        id: 3,
        name: 'Музей 3',
        address: 'Ленинградская 3, Санкт-Петербург',
        contactInfo: '8-123-456-78-90',
    },
  ];

  constructor() {}

  getAllMuseums(): Observable<Museum[]> {
    return of(this.museums);
  }
}