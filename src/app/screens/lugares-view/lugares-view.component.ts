import { Observable } from 'rxjs';
import { CalendarService } from './../../services/calendar.service';
import { EventsService } from './../../services/events.service';
import { Component, Input, OnInit } from '@angular/core';
import { isUndefined } from 'util';
import { Router } from '@angular/router';
//Model
import { Event } from './../../model/event';
import { Nota } from './../../model/nota';
//Service
import { PlacesService } from './../../services/places.service';
import { Calendario } from 'src/app/model/calendario';

@Component({
  selector: 'app-lugares-view',
  templateUrl: './lugares-view.component.html',
  styleUrls: ['./lugares-view.component.css']
})
export class LugaresViewComponent implements OnInit {

  evento = {} as any;
  stars: number;

  mensagens$: Observable<Nota[]>
  mensagens: Nota[]
  idMensagens: string

  data
  altera = false;

  starsComment = 0;
  descriptComment = '';
  user;
  rota;
  constructor(
    private eventsService: EventsService,
    private placeService: PlacesService,
    private calendarService: CalendarService,
    private router: Router,
    ) {
      this.rota = JSON.parse(localStorage.getItem('rota'));
      this.user =  JSON.parse(localStorage.getItem('userCompleto'));
      var uid = JSON.parse(localStorage.getItem('idEvent'))

      if(this.rota === 'Home'){
        this.eventsService.getEvent(uid).valueChanges({idField: 'uid'}).subscribe(event => {
          this.evento = event;
          this.data = new Date(this.evento.date.seconds * 1000)
          this.idMensagens = event.idPlace;
          this.comments()
        })
      }else if(this.rota === 'Lugares'){
        this.placeService.getPlaceId(uid).valueChanges({idField: 'uid'}).subscribe(place => {
          this.evento = place;
          this.idMensagens = place.uid
          this.comments()
        })
      }


  }

  ngOnInit(): void {
  }

  comments(){
    this.mensagens$ = this.placeService.getComment(this.idMensagens).valueChanges({idField: 'uid'});
    this.mensagens$.subscribe(mensagens => {
      this.mensagens = mensagens;
      if(this.rota === 'Home'){
        let notaMediaMessage
        if(mensagens.length > 0){
          notaMediaMessage = mensagens.reduce((total, nota) => total + nota.value, 0) / mensagens.length;
        }else{
          notaMediaMessage = 0;
        }
        if(this.evento.notaMedia !== notaMediaMessage){
          this.evento.notaMedia = notaMediaMessage;
          this.eventsService.updateNota(this.evento)
        }
      }
      this.stars = this.evento.notaMedia;
      this.stars = Math.round(this.stars);
    })
  }

  route(){
    this.router.navigate(['menu/home']);
  }

  onComment(){
    let comentario = {} as Nota
    comentario.author = this.user.username;
    comentario.data = new Date();
    comentario.value = this.starsComment;
    comentario.description = this.descriptComment;

    this.descriptComment = '';
    this.starsComment = 0;

    this.mensagens.push(comentario)
    let notaMediaMensagens = this.mensagens.reduce((total, nota) => total + nota.value, 0) / this.mensagens.length;
    this.placeService.updateNotaMedia(this.idMensagens, notaMediaMensagens)

    this.placeService.createComment(this.evento, comentario);

  }

  deleteComment(comentario: Nota){
    let notaMediaMensagens
    let index = this.mensagens.indexOf(comentario)
    this.mensagens.splice(index, 1);
    if(this.mensagens.length > 0){
      notaMediaMensagens = this.mensagens.reduce((total, nota) => total + nota.value, 0) / this.mensagens.length;
    }else{
      notaMediaMensagens = 0;
    }
    this.placeService.updateNotaMedia(this.idMensagens, notaMediaMensagens)

    this.placeService.deleteComment(this.evento, comentario);
  }

  transformaData(data){
    var day: Date
    if(isUndefined(data.seconds)){
      day = data;
    }else{
      day = new Date(data.seconds * 1000);
    }
    return day.getDate() + "/" + (day.getMonth()+1) + "/" + day.getFullYear()
  }

  onDate(){
    let calendar = {} as Calendario;
    calendar.title = this.evento.username;
    calendar.uid = this.evento.uid;

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

    this.calendarService.editCalendar(calendar)
    this.eventsService.updateData(this.evento);
    window.alert("Data Alterada!")
  }

  onDelete(){
    if(window.confirm("Realmente não vai rolar?")){
      this.eventsService.deleteEvent(this.evento);
      this.calendarService.deleteCalendar(this.evento.uid)
      this.router.navigate(['menu/home']);
    }
  }

  onFinish(){
    if(window.confirm("Você e toda galera já deram a nota?")){
      if(!this.evento.finish){ this.placeService.updateFinish(this.evento.idPlace) }
      this.eventsService.deleteEvent(this.evento);
      this.calendarService.deleteCalendar(this.evento.uid)
      this.router.navigate(['menu/home']);
    }
  }

  onCreate(){
    this.router.navigate(['menu/cadastro']);
  }

  onEdit(){
    localStorage.setItem('edit', JSON.stringify(true));
    this.router.navigate(['menu/cadastro']);
  }

}
