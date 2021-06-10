import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//Model
import { Event } from './../../../model/event';
//Service
import { PlacesService } from '../../../services/places.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  @Input() categoria: string;

  lugares$: Observable<Event[]>;
  lugares: Event[];

  constructor(
    private placesService: PlacesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.lugares$ = this.placesService.getEvents(this.categoria).valueChanges({idField : 'uid'});
    this.lugares$.subscribe(lugares => {
      this.lugares = lugares;
      console.log(lugares)
    })
  }

  route(lugar: Event){
    localStorage.setItem('idEvent', JSON.stringify(lugar.uid));
    this.router.navigate(['menu/view']);
  }

}
