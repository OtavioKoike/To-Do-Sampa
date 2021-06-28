import { Place } from 'src/app/model/place';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {

  lugares$: Observable<Place[]>;
  lugares: Place[];

  lugaresAux$: Observable<Place[]>;
  lugaresAux: Place[];

  rest = [];

  ordem = 'Alfabetica'
  sistema = 'Todos'
  food = ''

  constructor(
    private placesService: PlacesService,
    private router: Router,
  ) { localStorage.removeItem('idEvent') }

  ngOnInit(): void {
    this.lugares$ = this.placesService.getPlaces('Restaurantes').valueChanges({idField : 'uid'});
    this.lugares$.subscribe(lugares => {
      this.lugares = lugares;
      this.lugaresAux = lugares;
      console.log(lugares)
      this.calculaCol();
    })
  }

  route(){
    this.router.navigate(['menu/cadastro']);
  }

  calculaCol(){
    this.rest = []
    let final = 5 - (this.lugares.length % 5);
      if(final != 5){
        for (let index = 0; index < final; index++) {
          this.rest.push(index);
        }
      }
  }

  filter(){
    let returnArray = [];

    if(this.sistema !== 'Todos'){
      returnArray = this.lugaresAux.filter(lugar =>
        lugar.sistema === this.sistema
      );
    }else{
      returnArray = this.lugaresAux;
    }

    returnArray = returnArray.filter(lugar => lugar.food.startsWith(this.food.charAt(0).toUpperCase() + this.food.slice(1)))

    switch(this.ordem){
      case 'Alfabetica':
        returnArray.sort(function(a,b) {
          return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
        });
        break;
      case 'Notas':
        returnArray.sort(function(a,b) {
          return a.notas.reduce((total, nota) => total + nota.value, 0) / this.a.notas.length < b.notas.reduce((total, nota) => total + nota.value, 0) / this.b.notas.length ? -1 : a.notas.reduce((total, nota) => total + nota.value, 0) / this.a.notas.length > b.notas.reduce((total, nota) => total + nota.value, 0) / this.b.notas.length ? 1 : 0;
        });
        break;
      case 'Fomos':
        returnArray.sort(function(a,b) {
          return a.finish > b.finish ? -1 : a.finish < b.finish ? 1 : 0;
        });
        break;
      case 'NFomos':
        returnArray.sort(function(a,b) {
          return a.finish < b.finish ? -1 : a.finish > b.finish ? 1 : 0;
        });
        break;
    }

    this.lugares = returnArray
    this.calculaCol()
    }

}
