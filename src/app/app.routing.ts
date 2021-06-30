import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Guards
import { AuthGuard } from './guard/auth.guard';
import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard';
//Login
import { ForgotPasswordComponent } from './screens/Login/forgot-password/forgot-password.component';
import { SignInComponent } from './screens/Login/sign-in/sign-in.component';
import { SignUpComponent } from './screens/Login/sign-up/sign-up.component';
import { VerifyEmailComponent } from './screens/Login/verify-email/verify-email.component';
//Outros
import { CalendarioComponent } from './screens/calendario/calendario.component';
import { HomeComponent } from './screens/home/home.component';
import { LugaresCadastroComponent } from './screens/lugares-cadastro/lugares-cadastro.component';
import { LugaresComponent } from './screens/lugares/lugares.component';
import { LugaresViewComponent } from './screens/lugares-view/lugares-view.component';6
import { MenuComponent } from './shared/menu/menu.component';

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
      { path: 'restaurantes', component: LugaresComponent, canActivate: [AuthGuard]},
      { path: 'bares', component: LugaresComponent, canActivate: [AuthGuard]},
      { path: 'cafeterias', component: LugaresComponent, canActivate: [AuthGuard]},
      { path: 'viagens', component: LugaresComponent, canActivate: [AuthGuard]},
      { path: 'eventos', component: LugaresComponent, canActivate: [AuthGuard]},
      { path: 'outros', component: LugaresComponent, canActivate: [AuthGuard]},
      { path:'cadastro', component: LugaresCadastroComponent, canActivate: [AuthGuard]},
      { path:'view', component: LugaresViewComponent, canActivate: [AuthGuard]},
      { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard]},
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
