import { Event } from './../model/event';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(public db: AngularFirestore) { }

  // Eventos
  createEvent(event: Event){
    this.db.doc(`event/${this.db.createId()}`).set({
      photoUrl: event.photoUrl,
      link: event.link,
      username: event.username,
      description: event.description,
      notas: event.notas,
      notaMedia: event.notaMedia,
      finish: event.finish,
      type: event.type,
      idPlace: event.idPlace,
      date: event.date,
      days: event.days,
      sistema: event.sistema,
      food: event.food,
    })
  }

  // Para mostrar no home
  getEvents(): AngularFirestoreCollection<Event> {
    var places: AngularFirestoreCollection<Event> = this.db.collection<Event>(
      '/event',
      (ref: CollectionReference) => ref.orderBy('date')
    );
    return places;
  }

  // Para mostrar no View
  getEvent(uid: string): AngularFirestoreDocument<Event> {
    var place: AngularFirestoreDocument<Event> = this.db.doc<Event>(`/event/${uid}`);
    return place;
  }

  deleteEvent(evento: Event){
    this.db.doc(`/event/${evento.uid}`).delete();
  }

  // ----------------------------------------------------------------------------------
  updateData(evento: Event){
    this.db.doc(`/event/${evento.uid}`).update({
      date: evento.date,
      days: evento.days
    })
  }
}
