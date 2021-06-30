import { Component, OnInit } from '@angular/core';
//Service
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  route(place: string){
    localStorage.setItem('pagePlace', JSON.stringify(place));
  }

  SignOut(){
    this.authService.SignOut();
  }

}
