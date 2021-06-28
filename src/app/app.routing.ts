import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Guards
import { AuthGuard } from './guard/auth.guard';
import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard';

//Login
import { VerifyEmailComponent } from './screens/Login/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './screens/Login/forgot-password/forgot-password.component';
import { SignUpComponent } from './screens/Login/sign-up/sign-up.component';
import { SignInComponent } from './screens/Login/sign-in/sign-in.component';
//Outros
import { HomeComponent } from './screens/home/home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { LugaresCadastroComponent } from './screens/lugares-cadastro/lugares-cadastro.component';
import { LugaresViewComponent } from './screens/lugares-view/lugares-view.component';
import { RestaurantesComponent } from './screens/restaurantes/restaurantes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },

  {path: 'menu', component: MenuComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo:'home', pathMatch:'full'},
      { path:'home', component: HomeComponent, canActivate: [AuthGuard]},
      { path:'cadastro', component: LugaresCadastroComponent, canActivate: [AuthGuard]},
      { path:'view', component: LugaresViewComponent, canActivate: [AuthGuard]},
      { path: 'restaurante', component: RestaurantesComponent, canActivate: [AuthGuard]},
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
