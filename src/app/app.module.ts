import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';

// Import routing module
import { AppRoutingModule } from './app.routing';

//Responsividade
import { FlexLayoutModule } from "@angular/flex-layout";

//Ng Boootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

//Service
import { AuthService } from './services/auth.service';
import { HomeComponent } from './screens/home/home.component';
import { MenuComponent } from './screens/menu/menu.component';
import { PlacesService } from './services/places.service';

// Componentes
import { SignInComponent } from './screens/Login/sign-in/sign-in.component';
import { SignUpComponent } from './screens/Login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './screens/Login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './screens/Login/verify-email/verify-email.component';
import { SliderComponent } from './screens/home/slider/slider.component';
import { SliderItemDirective } from './screens/home/slider/slider-item.directive';
import { CategoriasComponent } from './screens/home/categorias/categorias.component';
import { LugaresCadastroComponent } from './screens/lugares-cadastro/lugares-cadastro.component';
import { LugaresViewComponent } from './screens/lugares-view/lugares-view.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HomeComponent,
    MenuComponent,
    SliderComponent,
    SliderItemDirective,
    CategoriasComponent,
    LugaresCadastroComponent,
    LugaresViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatBadgeModule,
    FlexLayoutModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule
  ],
  providers: [
    AuthService,
    PlacesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
