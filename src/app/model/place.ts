import { Nota } from './nota';
export interface Place {
  uid: string;
  photoUrl: string;
  link: string;
  username: string;
  description: string;
  notas: Nota[];
  finish: boolean;
  type: string;
}
