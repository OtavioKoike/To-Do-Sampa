import { PlacesService } from './../../services/places.service';
import { Nota } from './../../model/nota';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from './../../model/event';
import { isUndefined } from 'util';

@Component({
  selector: 'app-lugares-view',
  templateUrl: './lugares-view.component.html',
  styleUrls: ['./lugares-view.component.css']
})
export class LugaresViewComponent implements OnInit {

  evento = {} as Event
  stars: number;

  data = ''
  altera = false;

  starsComment = 0;
  descriptComment = '';

  constructor(
    private placeService: PlacesService,
    private router: Router
    ) {
    this.evento = JSON.parse(localStorage.getItem('event'));
    if(this.evento.notas.length > 0){
      this.stars = this.evento.notas.reduce((total, nota) => total + nota.value, 0) / this.evento.notas.length;
      this.stars = Math.round(this.stars);
    }else{this.stars = 0}
  }

  ngOnInit(): void {
  }

  route(){
    localStorage.setItem('event', null);
    this.router.navigate(['menu/home']);
  }

  onComment(){
    let comentario = {} as Nota
    let user =  JSON.parse(localStorage.getItem('userCompleto'));
    comentario.author = user.username;
    comentario.data = new Date();
    comentario.value = this.starsComment;
    comentario.description = this.descriptComment;

    this.descriptComment = '';
    this.starsComment = 0;

    this.evento.notas.push(comentario)

    localStorage.setItem('event', JSON.stringify(this.evento));
    this.placeService.createComment(this.evento);
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

    localStorage.setItem('event', JSON.stringify(this.evento));
    this.placeService.updateData(this.evento);
    window.alert("Data Alterada!")
  }

  onDelete(){
    this.placeService.deleteEvent(this.evento);
    localStorage.setItem('event', null);
    this.router.navigate(['menu/home']);
  }
}
