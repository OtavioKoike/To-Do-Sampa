import { PlacesService } from './../../services/places.service';
import { Place } from 'src/app/model/place';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AngularFireUploadTask,
  AngularFireStorage,
} from '@angular/fire/storage';
import { isUndefined } from 'util';

@Component({
  selector: 'app-lugares-cadastro',
  templateUrl: './lugares-cadastro.component.html',
  styleUrls: ['./lugares-cadastro.component.css']
})
export class LugaresCadastroComponent implements OnInit {

  lugar = {} as Place

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
    this.placesService.getUnico(this.lugar.username).valueChanges({idField : 'id'}).subscribe(lugar => {
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
    if(isUndefined(this.data) || this.data === null){
      this.lugar.date = ''
    }else{
      this.lugar.date = this.data;
    }

    if(isUndefined(this.lugar.days)){
      this.lugar.days = null
    }

    if(!this.existe){
      this.placesService.create(this.lugar);
    }

    this.route();
  }

}

// uid: AUTOMATICO;
  // photoUrl: PEGAR; -------------
  // link?: PEGAR; -----------
  // username: PEGAR;    V
  // description: PEGAR; ---------
  // notas: AUTOMATICO;
  // date?: NOVO;
  // finish: AUTOMATICO;
  // type: PEGAR;           V
  // days: NOVO
