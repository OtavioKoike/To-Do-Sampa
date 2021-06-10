import { Component, OnInit } from '@angular/core';
import { isUndefined } from 'util';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// Firebase Storage
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
// Model
import { Event } from './../../model/event';
import { Place } from 'src/app/model/place';
//Service
import { PlacesService } from './../../services/places.service';

@Component({
  selector: 'app-lugares-cadastro',
  templateUrl: './lugares-cadastro.component.html',
  styleUrls: ['./lugares-cadastro.component.css']
})
export class LugaresCadastroComponent implements OnInit {

  lugar = {} as Place
  evento = {} as Event

  data = ''
  existe = false;

  //Para upload da imagem
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  buscaLugar(){
    this.placesService.getPlace(this.lugar.username).valueChanges({idField : 'uid'}).subscribe(lugar => {
      if(lugar.length > 0){
        this.lugar = lugar[0];
        this.existe = true;
      }else{
        window.alert("Local inexistente")
      }
    })
  }

  route(){
    this.router.navigate(['menu/home']);
  }

  upload(event) {
    this.complete = false;
    const file = event.target.files[0];
    const path = `place/${file.name}`;
    const fileRef = this.storage.ref(path.replace(/\s/g, ''));
    this.task = this.storage.upload(path.replace(/\s/g, ''), file);
    this.task.then((up) => {
      fileRef.getDownloadURL().subscribe((url) => {
        this.complete = true;
        this.lugar.photoUrl = url;
      });
    });
    this.uploadPercent = this.task.percentageChanges();
  }

  onSubmit(){
    this.lugar.username = this.lugar.username.trim();
    if(!this.existe){
      this.lugar.notas = [];
      this.lugar.finish = false;
      this.lugar.uid = this.placesService.createPlace(this.lugar);
    }

    this.evento.photoUrl = this.lugar.photoUrl;
    this.evento.link = this.lugar.link;
    this.evento.username = this.lugar.username;
    this.evento.description = this.lugar.description;
    this.evento.notas = this.lugar.notas;
    this.evento.finish = this.lugar.finish;
    this.evento.type = this.lugar.type;
    this.evento.idPlace = this.lugar.uid;

    if(isUndefined(this.data) || this.data === null){
      this.evento.date = ''
    }else{
      this.evento.date = this.data;
    }

    if(isUndefined(this.evento.days)){
      this.evento.days = null
    }

    this.placesService.createEvent(this.evento);
    this.route();
  }

}
