import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
//Service
import { AuthService } from './../../../services/auth.service';
//Model
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: User = {} as User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    var users$: Observable<User[]> = this.authService.getUserData(form.value.username).valueChanges()
    users$.subscribe(user => {
      if(user.length > 0){
        this.user = user[0];
        this.authService.SignIn(user[0].email, form.value.userPassword)
      }else{
        window.alert("The username does not exist.")
      }
    })
  }

}
