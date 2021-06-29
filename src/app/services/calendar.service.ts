import { Calendario } from '../model/calendario';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(public db: AngularFirestore) { }

  createCalendar(calendar: Calendario){
    this.db.doc(`calendar/${calendar.uid}`).set({
      title: calendar.title,
      start: calendar.start,
      end: calendar.end,
    })
  }

  editCalendar(calendar: Calendario){
    this.db.doc(`calendar/${calendar.uid}`).update({
      title: calendar.title,
      start: calendar.start,
      end: calendar.end,
    })
  }

  // Para mostrar no Calendario
  getCalendar(): AngularFirestoreCollection<Calendario> {
    var dates: AngularFirestoreCollection<Calendario> = this.db.collection<Calendario>(`/calendar`);
    return dates;
  }

  deleteCalendar(uid: string){
    this.db.doc(`/calendar/${uid}`).delete();
  }

}
