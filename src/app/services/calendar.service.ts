import { Injectable } from '@angular/core';
// Firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// Model
import { Calendario } from '../model/calendario';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(public db: AngularFirestore) { }

  getCalendar(): AngularFirestoreCollection<Calendario> {
    var dates: AngularFirestoreCollection<Calendario> = this.db.collection<Calendario>(`/calendar`);
    return dates;
  }

  // Para mostrar todos eventos no calendario
  createCalendar(calendar: Calendario){
    this.db.doc(`calendar/${calendar.uid}`).set({
      title: calendar.title,
      start: calendar.start,
      end: calendar.end,
    })
  }

  // Para editar a data de um evento na View
  editCalendar(calendar: Calendario){
    this.db.doc(`calendar/${calendar.uid}`).update({
      title: calendar.title,
      start: calendar.start,
      end: calendar.end,
    })
  }

  // Para deletar evento quando acabar o role
  deleteCalendar(uid: string){
    this.db.doc(`/calendar/${uid}`).delete();
  }

}
