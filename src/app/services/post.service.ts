import { Post } from './../model/post';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    public db: AngularFirestore,
  ) { }

  get(type: string): AngularFirestoreCollection<Post> {
    var posts: AngularFirestoreCollection<Post> = this.db.collection<Post>(
      '/post',
      (ref: CollectionReference) => ref.where('type', '==', type)
      .orderBy('date')
      .limit(10)
    );
    return posts;
  }
}
