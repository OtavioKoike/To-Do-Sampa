import { Nota } from './nota';
export interface Place {
  uid: string;
  photoUrl: string;
  link?: string;
  username: string;
  description: string;
  notas: Nota[];
  date?: any;
  finish: boolean;
  type: string;
  days: number
}
