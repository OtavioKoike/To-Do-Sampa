import { Nota } from './nota';
export interface Place {
  description: string;
  finish: boolean;
  link: string;
  notas: Nota[];
  notaMedia: number;
  photoUrl: string;
  type: string;
  uid: string;
  username: string;
  sistema: string;
  food: string;
}
