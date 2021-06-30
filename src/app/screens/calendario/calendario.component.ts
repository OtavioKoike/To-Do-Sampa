import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// Calendario
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import esLocale from '@fullcalendar/core/locales/pt-br';
// Model
import { Calendario } from '../../model/calendario';
// Service
import { CalendarService } from './../../services/calendar.service';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  datas$: Observable<Calendario[]>;
  datas = [] as Calendario[];

  calendarOptions: CalendarOptions = {};

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.datas$ = this.calendarService.getCalendar().valueChanges({idField : 'id'});
    this.datas$.subscribe(datas => {
      this.datas = datas;
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        locale: esLocale,
        height: 580,
        events: this.datas,
        eventColor: 'rgba(183, 28, 28)',
        eventTextColor: '#fff',
        titleFormat: { year: 'numeric', month: 'numeric' },
        footerToolbar: {center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'},
        navLinks: true,
        eventClick: function(event) {
          localStorage.setItem('idEvent', JSON.stringify(event.event.id));
          if(window.confirm("Role: " + event.event.title +
          "\nData: " + ("0" + (event.event.start.getDate())).slice(-2) + "/" + ("0" + (event.event.start.getMonth() + 1)).slice(-2) +
          "\n\nVer Role?")){window.location.href = '/menu/view'}
          return false;
      },
      }
    })
  }

}
