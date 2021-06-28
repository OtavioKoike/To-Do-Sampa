import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Place } from 'src/app/model/place';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {

  lugares$: Observable<Place[]>;
  lugares: Place[];

  melhores: Place[];
  rodizio: Place[];
  carte: Place[];
  delivery: Place[];
  fomos: Place[];
  nFomos: Place[];

  lugaresAux: Place[];

  food = ''

  page: string;

  constructor(
    private placesService: PlacesService,
    private router: Router,
  ) {
    localStorage.removeItem('idEvent')
    localStorage.removeItem('edit')
    localStorage.setItem('rota', JSON.stringify('Lugares'));
   }

  ngOnInit(): void {
    this.page = JSON.parse(localStorage.getItem('pagePlace'))
    this.lugares$ = this.placesService.getPlaces(this.page).valueChanges({idField : 'uid'});
    this.lugares$.subscribe(lugares => {
      this.lugares = lugares;
      this.lugaresAux = lugares;
      this.separa(lugares)
    })
  }

  separa(lugares: Place[]){
    this.melhores = lugares.filter(lugar => lugar.notaMedia > 0).sort(function(a,b) { return a.notaMedia > b.notaMedia ? -1 : a.notaMedia < b.notaMedia ? 1 : 0}).slice(0,10);
    this.rodizio = lugares.filter(lugar => lugar.sistema === "Rodizio");
    this.carte = lugares.filter(lugar => lugar.sistema === "A la Carte");
    this.delivery = lugares.filter(lugar => lugar.sistema === "Delivery");
    this.fomos = lugares.filter(lugar => lugar.finish === true);
    this.nFomos = lugares.filter(lugar => lugar.finish === false);
  }

  route(){
    this.router.navigate(['menu/cadastro']);
  }

  filter(){
    this.lugares = this.lugaresAux.filter(
      lugar => lugar.food.startsWith(this.food.charAt(0).toUpperCase() + this.food.slice(1))
      || lugar.username.startsWith(this.food.toLowerCase())
    )
      this.separa(this.lugares)
  }

}
