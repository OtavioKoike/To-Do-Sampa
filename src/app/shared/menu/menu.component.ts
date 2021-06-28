import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Service
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  SignOut(){
    this.authService.SignOut();
  }

  route(place: string){
    localStorage.setItem('pagePlace', JSON.stringify(place));

    switch(place){
      case 'Restaurantes':
        this.router.navigate(['menu/restaurantes']);
        break;
      case 'Bares':
        this.router.navigate(['menu/bares']);
        break;
      case 'Cafeterias':
        this.router.navigate(['menu/cafeterias']);
        break;
      case 'Viagens':
        this.router.navigate(['menu/viagens']);
        break;
      case 'Eventos':
        this.router.navigate(['menu/eventos']);
        break;
      case 'Outros':
        this.router.navigate(['menu/outros']);
        break;
    }
  }

}
