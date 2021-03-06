import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Model
import { Event } from '../../model/event';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  @Input() categoria: string;
  @Input() lugares = [] as Event[];

  constructor(private router: Router) {}

  ngOnInit(): void { }

  route(lugar: Event){
    localStorage.setItem('idEvent', JSON.stringify(lugar.uid));
    this.router.navigate(['menu/view']);
  }

}
