import { Calendario } from '../../model/calendario';
import { CalendarService } from './../../services/calendar.service';
import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import esLocale from '@fullcalendar/core/locales/pt-br';
import { Observable } from 'rxjs';

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
    this.datas$ = this.calendarService.getCalendar().valueChanges({idField : 'uid'});
    this.datas$.subscribe(datas => {
      this.datas = datas;
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        locale: esLocale,
        dateClick: this.handleDateClick.bind(this), // bind is important!
        events: this.datas,
        eventColor: 'rgba(183, 28, 28)',
        eventTextColor: '#fff',
        height: 600,
        footerToolbar: {
          center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        titleFormat: { year: 'numeric', month: 'numeric' }
      }
    })
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

}
