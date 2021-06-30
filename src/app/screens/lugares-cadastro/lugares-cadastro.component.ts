import { Component, OnInit } from '@angular/core';
import { isUndefined } from 'util';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// Firebase Storage
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
// Model
import { Calendario } from '../../model/calendario';
import { Event } from './../../model/event';
import { Place } from 'src/app/model/place';
//Service
import { CalendarService } from './../../services/calendar.service';
import { EventsService } from './../../services/events.service';
import { PlacesService } from './../../services/places.service';

@Component({
  selector: 'app-lugares-cadastro',
  templateUrl: './lugares-cadastro.component.html',
  styleUrls: ['./lugares-cadastro.component.css']
})
export class LugaresCadastroComponent implements OnInit {

  titulo: string;

  lugar = {} as Place
  evento = {} as Event

  data = ''
  existe = false;

  idEvent: string;
  edit:boolean;

  //Para upload da imagem
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private calendarService: CalendarService,
    private eventsService: EventsService,
    private placesService: PlacesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.edit = JSON.parse(localStorage.getItem('edit'));
    this.edit ? this.titulo = "Algo errado no Lugar?": this.titulo = 'Bora cadastrar um role?';

    this.idEvent = JSON.parse(localStorage.getItem('idEvent'));
    if(this.idEvent !== null){
      this.placesService.getPlaceId(this.idEvent).valueChanges({idField : 'uid'}).subscribe(lugar => {
        this.lugar = lugar;
        this.existe = true;
      })
    }
  }

  buscaLugar(){
    this.placesService.getPlaceId(this.lugar.username).valueChanges({idField : 'uid'}).subscribe(lugar => {
      if(!isUndefined(lugar.username)){
        this.lugar = lugar;
        this.existe = true;
      }else{
        window.alert("Local inexistente")
      }
    })
  }

  route(){
    let rota = JSON.parse(localStorage.getItem('rota'));
    if(rota === "Home"){
      this.router.navigate(['menu/home']);
    }
    else {
      let page: string;
      page = JSON.parse(localStorage.getItem('pagePlace'));
      page = page.toLowerCase()
      this.router.navigate([`menu/${page}`]);
    }
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
    let calendar = {} as Calendario;
    calendar.title = this.lugar.username.trim();

    this.lugar.username = this.lugar.username.trim();
    this.lugar.food = (this.lugar.food.charAt(0).toUpperCase() + this.lugar.food.slice(1)).trim();

    if(!this.existe){
      this.lugar.notaMedia = 0;
      this.lugar.finish = false;
      this.lugar.uid = this.placesService.createPlace(this.lugar);
    }

    this.evento.photoUrl = this.lugar.photoUrl;
    this.evento.link = this.lugar.link;
    this.evento.username = this.lugar.username;
    this.evento.description = this.lugar.description;
    this.evento.notaMedia = this.lugar.notaMedia;
    this.evento.finish = this.lugar.finish;
    this.evento.type = this.lugar.type;
    this.evento.idPlace = this.lugar.uid;
    this.evento.sistema = this.lugar.sistema;
    this.evento.food = this.lugar.food;

    if(isUndefined(this.data) || this.data === null || this.data === ''){
      this.evento.date = ''
      calendar.start = ''
      calendar.end = ''
    }else{
      this.evento.date = this.data;
      let startDate = new Date(this.data);
      calendar.start = startDate.getFullYear() + '-' + ("0" + (startDate.getMonth() + 1)).slice(-2) + '-' + ("0" + startDate.getDate()).slice(-2)
      let endDate = startDate;
      if(!isUndefined(this.evento.days)){
        endDate.setDate(endDate.getDate() + this.evento.days)
      }
      calendar.end = endDate.getFullYear() + '-' + ("0" + (endDate.getMonth() + 1)).slice(-2) + '-' + ("0" + endDate.getDate()).slice(-2)
    }

    if(isUndefined(this.evento.days)){
      this.evento.days = null
    }

    if(!this.edit){
      this.evento.uid = this.db.createId()
      this.eventsService.createEvent(this.evento);
      calendar.uid = this.evento.uid
      this.calendarService.createCalendar(calendar)
    }else{
      this.placesService.editPlace(this.evento);
    }
    this.route();
  }

}
