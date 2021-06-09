import { Event } from './../../../model/event';
import { PlacesService } from '../../../services/places.service';
import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'src/app/model/place';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  route(lugar: Event){
    localStorage.setItem('event', JSON.stringify(lugar));
    this.router.navigate(['menu/view']);
  }

  ngOnInit(): void {
    this.lugares$ = this.placesService.getEvents(this.categoria).valueChanges({idField : 'uid'});
    this.lugares$.subscribe(lugares => {
      this.lugares = lugares;
      console.log(lugares)
    })
  }

}
