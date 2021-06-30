import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// Model
import { Event } from './../../model/event';
// Service
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lugares$: Observable<Event[]>;
  lugares: Event[];

  restaurantes: Event[];
  bares: Event[];
  cafeterias: Event[];
  viagens: Event[];
  eventos: Event[];
  outros: Event[];

  constructor(
    private eventsService: EventsService,
    private router: Router,
  ) {
    localStorage.removeItem('idEvent')
    localStorage.removeItem('pagePlace')
    localStorage.removeItem('edit')
    localStorage.setItem('rota', JSON.stringify('Home'))
 }

  ngOnInit(): void {
    this.lugares$ = this.eventsService.getEvents().valueChanges({idField : 'uid'});
    this.lugares$.subscribe(lugares => {
      this.lugares = lugares;
      this.restaurantes = lugares.filter(lugar => lugar.type === 'Restaurantes').splice(0, 10);
      this.bares = lugares.filter(lugar => lugar.type === 'Bares').splice(0, 10);
      this.cafeterias = lugares.filter(lugar => lugar.type === 'Cafeterias').splice(0, 10);
      this.viagens = lugares.filter(lugar => lugar.type === 'Viagens').splice(0, 10);
      this.eventos = lugares.filter(lugar => lugar.type === 'Eventos').splice(0, 10);
      this.outros = lugares.filter(lugar => lugar.type === 'Outros').splice(0, 10);
    })
  }

  route(){
    this.router.navigate(['menu/cadastro']);
  }

}
