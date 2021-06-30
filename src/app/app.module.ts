import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
// Import routing module
import { AppRoutingModule } from './app.routing';
//Responsividade
import { FlexLayoutModule } from "@angular/flex-layout";
//Ng Boootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Calendar
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import listPlugin from '@fullcalendar/list';  // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
//Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
// Angular Material
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
//Service
import { AuthService } from './services/auth.service';
import { CalendarService } from './services/calendar.service';
import { EventsService } from './services/events.service';
import { PlacesService } from './services/places.service';
// Componentes
import { AppComponent } from './app.component';
import { CalendarioComponent } from './screens/calendario/calendario.component';
import { CategoriasComponent } from './shared/categorias/categorias.component';
import { ForgotPasswordComponent } from './screens/Login/forgot-password/forgot-password.component';
import { HomeComponent } from './screens/home/home.component';
import { LugaresCadastroComponent } from './screens/lugares-cadastro/lugares-cadastro.component';
import { LugaresComponent } from './screens/lugares/lugares.component';
import { LugaresViewComponent } from './screens/lugares-view/lugares-view.component';
import { MenuComponent } from './shared/menu/menu.component';
import { SignInComponent } from './screens/Login/sign-in/sign-in.component';
import { SignUpComponent } from './screens/Login/sign-up/sign-up.component';
import { SliderComponent } from './shared/slider/slider.component';
import { SliderItemDirective } from './shared/slider/slider-item.directive';
import { VerifyEmailComponent } from './screens/Login/verify-email/verify-email.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  listPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    CalendarioComponent,
    CategoriasComponent,
    ForgotPasswordComponent,
    HomeComponent,
    LugaresCadastroComponent,
    LugaresComponent,
    LugaresViewComponent,
    MenuComponent,
    SignInComponent,
    SignUpComponent,
    SliderComponent,
    SliderItemDirective,
    VerifyEmailComponent
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
    FlexLayoutModule,
    NgbModule,
    FullCalendarModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [
    AuthService,
    CalendarService,
    EventsService,
    PlacesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
