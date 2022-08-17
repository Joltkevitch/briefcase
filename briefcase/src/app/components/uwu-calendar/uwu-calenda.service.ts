import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CalendarData } from './models/calendar-data.model';
import { TimeRangeEvent } from './models/time-range-event.model';

@Injectable()
export class UwuCalendarService {
  $timeRangeEventsSubject: BehaviorSubject<TimeRangeEvent[]>;
  $calendarDataSubject: BehaviorSubject<CalendarData>;

  private defaultColors: string[] = [
    '#60C689',
    '#57DCBE',
    '#1A1A1A',
    '#276BB0',
    '#2529AC',
    '#5527AE',
    '#9C26B1',
    '#C1185B',
    '#E91F63',
  ];

  private usedColors: string[] = [];

  constructor() {
    this.$calendarDataSubject = new BehaviorSubject(new CalendarData());
  }

  onCalendarChanges(calendarData: CalendarData): void {
    this.$calendarDataSubject.next(calendarData);
  }

  setRandomColorsInEvents(timeRangeEvents: TimeRangeEvent[]): TimeRangeEvent[] {
    return timeRangeEvents.map((timeEvent) => {
      if (timeEvent.event.color === '')
        timeEvent.event = timeEvent.event.assingColor(this.getRandomColor());
      return timeEvent;
    });
  }

  private getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.defaultColors.length);
    const selectedColor = this.defaultColors.splice(randomIndex, 1)[0];
    this.usedColors.push(selectedColor);
    return selectedColor;
  }
}
