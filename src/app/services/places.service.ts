import { Injectable } from '@angular/core';
// Firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference } from '@angular/fire/firestore';
//Model
import { Event } from './../model/event';
import { Nota } from './../model/nota';
import { Place } from '../model/place';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(public db: AngularFirestore) { }

  // Para Trazer os dados do local na view e no cadastro(busca)
  getPlaceId(id: string): AngularFirestoreDocument<Place> {
    var places: AngularFirestoreDocument<Place> = this.db.doc<Place>(`/places/${id}`);
    return places;
  }

  // Para mostrar locais na page
  getPlaces(type: string): AngularFirestoreCollection<Place> {
    var places: AngularFirestoreCollection<Place> = this.db.collection<Place>(
      '/places',
      (ref: CollectionReference) => ref.where('type', '==', type)
      .orderBy('username')
    );
    return places;
  }

  // Criar Lugar
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

  // Editar Lugar
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

  // ----------------------------------------------------------------------------------
  // Pegar comentarios do local e exibir na View
  getComment(id: string): AngularFirestoreCollection<Nota> {
    var mensagens: AngularFirestoreCollection<Nota> = this.db.collection<Nota>(`places/${id}/avaliacoes`,
    (ref: CollectionReference) => ref.orderBy('data'));
    return mensagens;
  }

  // Criar comentarios
  createComment(evento: Event, nota: Nota){
    this.db.doc(`places/${evento.idPlace}/avaliacoes/${this.db.createId()}`).set({
      author: nota.author,
      value: nota.value,
      data: nota.data,
      description: nota.description,
    })
  }

  // Deletar comentarios
  deleteComment(evento: Event, nota: Nota){
    this.db.doc(`places/${evento.idPlace}/avaliacoes/${nota.uid}`).delete()
  }

  // ----------------------------------------------------------------------------------
  // Atualizar quando for no local
  updateFinish(uid: string){
    this.db.doc(`places/${uid}`).update({
      finish: true
    })
  }

  // ----------------------------------------------------------------------------------
  // Atualizar a nota media do local
  updateNotaMedia(id: string, nota: number){
    this.db.doc(`places/${id}`).update({
      notaMedia: nota
    })
  }

}
