import { Injectable } from '@angular/core';
// Firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference } from '@angular/fire/firestore';
// Model
import { Event } from './../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(public db: AngularFirestore) { }

  // Para mostrar eventos no Home
  getEvents(): AngularFirestoreCollection<Event> {
    var places: AngularFirestoreCollection<Event> = this.db.collection<Event>(
      '/event',
      (ref: CollectionReference) => ref.orderBy('date')
    );
    return places;
  }

  // Para Trazer os dados do evento na view
  getEvent(uid: string): AngularFirestoreDocument<Event> {
    var place: AngularFirestoreDocument<Event> = this.db.doc<Event>(`/event/${uid}`);
    return place;
  }

  // Criar Eventos
  createEvent(event: Event){
    this.db.doc(`event/${event.uid}`).set({
      photoUrl: event.photoUrl,
      link: event.link,
      username: event.username,
      description: event.description,
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

  // Deletar Eventos
  deleteEvent(evento: Event){
    this.db.doc(`/event/${evento.uid}`).delete();
  }

  // ----------------------------------------------------------------------------------
  // Atualizar a data do evento
  updateData(evento: Event){
    this.db.doc(`/event/${evento.uid}`).update({
      date: evento.date,
      days: evento.days
    })
  }

  // ----------------------------------------------------------------------------------
  // Atualizar a nota media do Local no evento
  updateNota(evento: Event){
    this.db.doc(`/event/${evento.uid}`).update({
      notaMedia: evento.notaMedia
    })
  }
}
