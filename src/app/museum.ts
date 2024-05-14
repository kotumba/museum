export interface Museum {
    id: number;
    name: string;
    address: string;
    contactInfo: string;
  }
  export interface Excursion {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
    museumId: number;
  }
  export interface Ticket {
    id: number;
    clientId: number;
    museumId: number;
    excursionId: number;
    checkInDate: Date;
    checkOutDate: Date;
    status: 'Забронировано' | 'Отменено';
  }