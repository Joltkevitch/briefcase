import { Component } from '@angular/core';
import { TimeRangeEvent } from './components/uwu-calendar/models/time-range-event.model';
import { Event } from './components/uwu-calendar/models/event.model';

@Component({
  selector: 'uwu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  timeRangeEvents = [
    new TimeRangeEvent(
      new Event({
        name: 'holidays',
        description: 'Some of my holidays',
        type: 'H',
        color: '',
        userName: 'Alex',
        assingColor: (color: string) => {
          return new Event();
        },
      }),
      {
        from: new Date(2022, 8, 1),
        to: new Date(2022, 8, 17),
      }
    ),
    new TimeRangeEvent(
      {
        name: 'Sick',
        description: 'Migrane',
        type: 'S',
        color: '',
        userName: 'Alex',
        assingColor: (color: string) => {
          return new Event();
        },
      },
      {
        from: new Date(2022, 8, 18, 9, 0, 0),
        to: new Date(2022, 8, 18, 11, 30, 0),
      }
    ),
  ];
}
