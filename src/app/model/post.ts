import { Nota } from './nota';
export interface Post {
  uid: String;
  photoUrl: String;
  link?: String;
  username: String;
  description: String;
  notas: Nota[];
  date?: any;
  finish: boolean;
  type: String;
}
