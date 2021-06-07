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
  get(type: string): AngularFirestoreCollection<Place> {
    var places: AngularFirestoreCollection<Place> = this.db.collection<Place>(
      '/post',
      (ref: CollectionReference) => ref.where('type', '==', type)
      .orderBy('date')
      .limit(10)
    );
    return places;
  }

  // Para Trazer os dados no cadastro caso exista
  getUnico(username: string): AngularFirestoreCollection<Place> {
    var places: AngularFirestoreCollection<Place> = this.db.collection<Place>(
      '/places',
      (ref: CollectionReference) => ref.where('username', '==', username)
      .limit(1)
    );
    return places;
  }

  // Cadastro
  create(lugar: Place){
    this.db.doc(`places/${this.db.createId()}`).set({
      photoUrl: lugar.photoUrl,
      link: lugar.link,
      username: lugar.username,
      description: lugar.description,
      notas: [],
      date: lugar.date,
      finish: false,
      type: lugar.type,
      days: lugar.days
    })
  }
}
