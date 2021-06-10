import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
  ) { localStorage.removeItem('idEvent') }

  ngOnInit(): void {
  }

  route(){
    this.router.navigate(['menu/cadastro']);
  }

}
