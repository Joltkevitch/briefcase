import { Month, WeekDay } from '../calendar.prototype';
import { ITimeRangeEvent } from './time-range-event.model';

export class DayWrapper {
  date: Date;
  day: number;
  month: Month;
  year: number;
  weekDay: WeekDay;
  weekDayName: string;
  monthName: string;
  timeRangeEvents: ITimeRangeEvent[];

  constructor(date: Date) {
    this.date = date;
    this.day = date.getDate();
    this.weekDay = date.getDay();
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.weekDayName = WeekDay.toString(this.weekDay);
    this.monthName = Month.toString(this.month);
  }

  setTimeRangeEvents(timeRangeEvents: ITimeRangeEvent[]): DayWrapper {
    this.timeRangeEvents = timeRangeEvents.filter((timeEvent) =>
      timeEvent.doesDateOverlap(this.date)
    );
    return this;
  }
}
