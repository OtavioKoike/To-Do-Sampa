import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Guards
import { AuthGuard } from './guard/auth.guard';
//Login
import { VerifyEmailComponent } from './screens/Login/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './screens/Login/forgot-password/forgot-password.component';
import { SignUpComponent } from './screens/Login/sign-up/sign-up.component';
import { SignInComponent } from './screens/Login/sign-in/sign-in.component';
//Outros
import { HomeComponent } from './screens/home/home.component';


export const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },

  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
