import { Nota } from './../model/nota';
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
    try{
      this.db.doc(`places/${lugar.username}`).set({
        photoUrl: lugar.photoUrl,
        link: lugar.link,
        username: lugar.username,
        description: lugar.description,
        notaMedia: lugar.notaMedia,
        finish: lugar.finish,
        type: lugar.type,
        sistema: lugar.sistema,
        food: lugar.food,
      })
      return lugar.username;
    }catch(e){
      window.alert("Local Existente")
    }

  }

  editPlace(lugar: Event){
    this.db.doc(`places/${lugar.idPlace}`).update({
      photoUrl: lugar.photoUrl,
      link: lugar.link,
      username: lugar.username,
      description: lugar.description,
      notaMedia: lugar.notaMedia,
      finish: lugar.finish,
      type: lugar.type,
      sistema: lugar.sistema,
      food: lugar.food,
    })
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

  // Para Trazer os dados na view (TROCAR PARA USERNAME)
  getPlaceId(id: string): AngularFirestoreDocument<Place> {
    var places: AngularFirestoreDocument<Place> = this.db.doc<Place>(`/places/${id}`);
    return places;
  }

  // ----------------------------------------------------------------------------------
  getComment(id: string): AngularFirestoreCollection<Nota> {
    var mensagens: AngularFirestoreCollection<Nota> = this.db.collection<Nota>(`places/${id}/avaliacoes`,
    (ref: CollectionReference) => ref.orderBy('data'));
    return mensagens;
  }

  createComment(evento: Event, nota: Nota){
    this.db.doc(`places/${evento.idPlace}/avaliacoes/${this.db.createId()}`).set({
      author: nota.author,
      value: nota.value,
      data: nota.data,
      description: nota.description,
    })
  }

  deleteComment(evento: Event, nota: Nota){
    this.db.doc(`places/${evento.idPlace}/avaliacoes/${nota.uid}`).delete()
  }

  updateFinish(uid: string){
    this.db.doc(`places/${uid}`).update({
      finish: true
    })
  }

  updateNotaMedia(id: string, nota: number){
    this.db.doc(`places/${id}`).update({
      notaMedia: nota
    })
  }

  // ----------------------------------------------------------------------------------
  setPage(place: string){

  }
}
