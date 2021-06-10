import { Component, OnInit } from '@angular/core';
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

  evento = {} as Event
  stars: number;

  data
  altera = false;

  starsComment = 0;
  descriptComment = '';
  user;

  constructor(
    private placeService: PlacesService,
    private router: Router,
    ) {
      this.user =  JSON.parse(localStorage.getItem('userCompleto'));
      var uid = JSON.parse(localStorage.getItem('idEvent'))
      this.placeService.getEvent(uid).valueChanges({idField: 'uid'}).subscribe(event => {
        this.evento = event;
        this.data = new Date(this.evento.date.seconds * 1000)
        if(this.evento.notas.length > 0){
          this.stars = this.evento.notas.reduce((total, nota) => total + nota.value, 0) / this.evento.notas.length;
          this.stars = Math.round(this.stars);
        }else{this.stars = 0}
        })
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
    this.placeService.createComment(this.evento);
  }

  deleteComment(comentario: Nota){
    let index = this.evento.notas.indexOf(comentario)
    this.evento.notas.splice(index, 1);
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

    this.placeService.updateData(this.evento);
    window.alert("Data Alterada!")
  }

  onDelete(){
    if(window.confirm("Realmente não vai rolar?")){
      this.placeService.deleteEvent(this.evento);
      this.router.navigate(['menu/home']);
    }
  }

  onFinish(){
    if(window.confirm("Você e toda galera já deram a nota?")){
      if(!this.evento.finish){ this.placeService.updateFinish(this.evento.idPlace) }
      this.placeService.deleteEvent(this.evento);
      this.router.navigate(['menu/home']);
    }
  }
}
