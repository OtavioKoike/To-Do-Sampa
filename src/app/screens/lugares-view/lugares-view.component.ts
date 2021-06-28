import { EventsService } from './../../services/events.service';
import { Component, Input, OnInit } from '@angular/core';
import { isUndefined } from 'util';
import { Router } from '@angular/router';
//Model
import { Event } from './../../model/event';
import { Nota } from './../../model/nota';
//Service
import { PlacesService } from './../../services/places.service';

@Component({
  selector: 'app-lugares-view',
  templateUrl: './lugares-view.component.html',
  styleUrls: ['./lugares-view.component.css']
})
export class LugaresViewComponent implements OnInit {

  evento = {} as any;
  stars: number;

  data
  altera = false;

  starsComment = 0;
  descriptComment = '';
  user;
  rota;
  constructor(
    private eventsService: EventsService,
    private placeService: PlacesService,
    private router: Router,
    ) {
      this.rota = JSON.parse(localStorage.getItem('rota'));
      this.user =  JSON.parse(localStorage.getItem('userCompleto'));
      var uid = JSON.parse(localStorage.getItem('idEvent'))

      if(this.rota === 'Home'){
        this.eventsService.getEvent(uid).valueChanges({idField: 'uid'}).subscribe(event => {
          this.evento = event;
          this.data = new Date(this.evento.date.seconds * 1000)
          this.stars = this.evento.notaMedia;
          this.stars = Math.round(this.stars);
        })
      }else if(this.rota === 'Lugares'){
        this.placeService.getPlaceId(uid).valueChanges({idField: 'uid'}).subscribe(place => {
          this.evento = place;
          this.stars = this.evento.notaMedia;
          this.stars = Math.round(this.stars);
        })
      }

  }

  ngOnInit(): void {
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

    this.evento.notas.push(comentario)
    this.evento.notaMedia = this.evento.notas.reduce((total, nota) => total + nota.value, 0) / this.evento.notas.length;
    this.placeService.createComment(this.evento);
  }

  deleteComment(comentario: Nota){
    let index = this.evento.notas.indexOf(comentario)
    this.evento.notas.splice(index, 1);
    this.evento.notaMedia = this.evento.notas.reduce((total, nota) => total + nota.value, 0) / this.evento.notas.length;
    this.placeService.createComment(this.evento);
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
    if(isUndefined(this.data) || this.data === null){
      this.evento.date = ''
    }else{
      this.evento.date = this.data;
    }

    if(isUndefined(this.evento.days)){
      this.evento.days = null
    }

    this.eventsService.updateData(this.evento);
    window.alert("Data Alterada!")
  }

  onDelete(){
    if(window.confirm("Realmente não vai rolar?")){
      this.eventsService.deleteEvent(this.evento);
      this.router.navigate(['menu/home']);
    }
  }

  onFinish(){
    if(window.confirm("Você e toda galera já deram a nota?")){
      if(!this.evento.finish){ this.placeService.updateFinish(this.evento.idPlace) }
      this.eventsService.deleteEvent(this.evento);
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
