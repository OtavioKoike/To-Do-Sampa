import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference } from '@angular/fire/firestore';
//Model
import { Event } from './../model/event';
import { Place } from '../model/place';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    public db: AngularFirestore,
  ) { }

  // Places
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
      sistema: lugar.sistema,
      food: lugar.food,
    })
    return id;
  }

  // Para mostrar na page
  getPlaces(type: string): AngularFirestoreCollection<Place> {
    var places: AngularFirestoreCollection<Place> = this.db.collection<Place>(
      '/places',
      (ref: CollectionReference) => ref.where('type', '==', type)
      .orderBy('username')
    );
    return places;
  }

  // Para Trazer os dados no cadastro caso exista
  getPlace(username: string): AngularFirestoreCollection<Place> {
    var places: AngularFirestoreCollection<Place> = this.db.collection<Place>('/places',
      (ref: CollectionReference) => ref.where('username', '==', username).limit(1));
    return places;
  }

  // ----------------------------------------------------------------------------------
  createComment(evento: Event){
    this.db.doc(`places/${evento.idPlace}`).update({
      notas: evento.notas
    })

    this.db.doc(`/event/${evento.uid}`).update({
      notas: evento.notas
    })
  }

  updateFinish(uid: string){
    this.db.doc(`places/${uid}`).update({
      finish: true
    })
  }

  // ----------------------------------------------------------------------------------
}
