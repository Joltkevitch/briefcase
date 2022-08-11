import { Month, WeekDay } from '../calendar.prototype';

export class DayWrapper {
  day: number;
  weekDay: WeekDay;
  weekDayName: string;
  month: Month;
  monthName: string;

  constructor(day: number, weekDay?: WeekDay, month?: Month) {
    this.day = day;
    this.weekDay = weekDay ? weekDay : 0;
    this.weekDayName = WeekDay.toString(this.weekDay);
    this.month = month ? month : 0;
    this.monthName = Month.toString(month);
  }
}
