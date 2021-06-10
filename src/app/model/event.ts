import { Place } from 'src/app/model/place';
export interface Event extends Place {
  date: any;
  days: number;
  idPlace: string;
  uid: string;
}
