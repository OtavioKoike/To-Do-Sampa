import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
//Service
import { AuthService } from 'src/app/services/auth.service';
//Model
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = {} as User;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    var users$: Observable<User[]> = this.authService.getUserData(form.value.username).valueChanges({ idField: 'id' })
    users$.subscribe(user => {
      if(user.length === 0){
        this.authService.SignUp(this.user, form.value.userPassword);
      }else {
        window.alert("The username is already in use by another account.")
      }
    })
  }
}
