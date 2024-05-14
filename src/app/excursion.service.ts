import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Excursion } from './museum';

@Injectable({
  providedIn: 'root',
})
export class ExcursionService {
  public excursions: Excursion[] = [
    {
        id: 1,
        name: 'Экскурсия 1',
        description: 'Хорошая экскурсия, приходите!',
        price: 500,
        available: true,
        museumId: 1,
    },
    {
        id: 2,
        name: 'Экскурсия 2',
        description: 'Замечательная экскурсия, приходите c друзьями!',
        price: 700,
        available: true,
        museumId: 2,
    },
    {
        id: 3,
        name: 'Экскурсия 3',
        description: 'Самая лучшая экскурсия, приходите c мамой!',
        price: 900,
        available: true,
        museumId: 3,
    },
  ];
  constructor() {}

  getAllExcursions(): Observable<Excursion[]> {
    return of(this.excursions);
  }

  getexcursionById(excursionId: number): Observable<Excursion | undefined> {
    return of(this.excursions.find((excursion) => excursion.id === excursionId));
  }

  getAvailableExcursionForMuseum(museumId: number): Observable<Excursion[]> {
    return of(
      this.excursions.filter((excursion) => excursion.available && excursion.museumId === museumId)
    );
  }

}
