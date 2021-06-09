import { Nota } from './../model/nota';
import { Event } from './../model/event';
import { Place } from '../model/place';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    public db: AngularFirestore,
  ) { }

  // Para mostrar no home
  getEvents(type: string): AngularFirestoreCollection<Event> {
    var places: AngularFirestoreCollection<Event> = this.db.collection<Event>(
      '/event',
      (ref: CollectionReference) => ref.where('type', '==', type)
      .orderBy('date')
      .limit(10)
    );
    return places;
  }

  // Para Trazer os dados no cadastro caso exista
  getPlace(username: string): AngularFirestoreCollection<Place> {
    var places: AngularFirestoreCollection<Place> = this.db.collection<Place>(
      '/places',
      (ref: CollectionReference) => ref.where('username', '==', username)
      .limit(1)
    );
    return places;
  }

  // Cadastro Place
  createPlace(lugar: Place): string{
    var id = this.db.createId();
    this.db.doc(`places/${id}`).set({
      photoUrl: lugar.photoUrl,
      link: lugar.link,
      username: lugar.username,
      description: lugar.description,
      notas: lugar.notas,
      finish: lugar.finish,
      type: lugar.type,
    })
    return id;
  }

  createComment(evento: Event){
    this.db.doc(`places/${evento.idPlace}`).update({
      notas: evento.notas
    })

    this.db.doc(`/event/${evento.uid}`).update({
      notas: evento.notas
    })
  }

  updateData(evento: Event){
    this.db.doc(`/event/${evento.uid}`).update({
      date: evento.date,
      days: evento.days
    })
  }

  // Cadastro
  createEvent(event: Event){
    this.db.doc(`event/${this.db.createId()}`).set({
      photoUrl: event.photoUrl,
      link: event.link,
      username: event.username,
      description: event.description,
      notas: event.notas,
      finish: event.finish,
      type: event.type,
      idPlace: event.idPlace,
      date: event.date,
      days: event.days
    })
  }

  deleteEvent(evento: Event){
    this.db.doc(`/event/${evento.uid}`).delete();
  }
}
