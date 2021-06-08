import { Place } from 'src/app/model/place';
export interface Event extends Place {
  uid: string;
  idPlace: string;
  date: any;
  days: number;
}
