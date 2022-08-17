import { Component } from '@angular/core';
import { TimeRangeEvent } from './components/uwu-calendar/models/time-range-event.model';
import { Event } from './components/uwu-calendar/models/event.model';
import { TimeRange } from './components/uwu-calendar/models/time-range.model';

@Component({
  selector: 'uwu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  timeRangeEvents = [
    new TimeRangeEvent({
      event: new Event({
        name: 'holidays',
        description: 'Some of my holidays',
        type: 'H',
        color: '',
        userName: 'Alex',
        assingColor: (color: string) => {
          return new Event();
        },
      }),
      timeRange: new TimeRange({
        from: new Date(2022, 7, 1),
        to: new Date(2022, 7, 18),
        isInRange(outerDate) {
          return false;
        },
      }),
    }),
    new TimeRangeEvent({
      event: new Event({
        name: 'Sick',
        description: 'Migrane',
        type: 'S',
        color: '',
        userName: 'Alex',
        assingColor: (color: string) => {
          return new Event();
        },
      }),
      timeRange: new TimeRange({
        from: new Date(2022, 7, 18, 9, 30, 0),
        to: new Date(2022, 7, 18, 18, 30, 0),
        isInRange(outerDate) {
          return false;
        },
      }),
    }),
  ];
}
