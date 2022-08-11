import { BehaviorSubject } from 'rxjs';
import { Month, WeekDay } from '../calendar.prototype';
import { DayWrapper } from './day-wrapper.model';

export class CalendarData {
  selectedDate: Date;
  selectedWeekDay: number;
  $onYearChange: BehaviorSubject<number>;
  $onMonthChange: BehaviorSubject<Month>;
  $onDayChange: BehaviorSubject<number>;

  constructor() {
    this.selectedDate = new Date();
    this.selectedWeekDay = this.selectedDate.getUTCDay();
    this.$onYearChange = new BehaviorSubject(
      this.selectedDate.getUTCFullYear()
    );
    this.$onMonthChange = new BehaviorSubject(this.selectedDate.getUTCMonth());
    this.$onDayChange = new BehaviorSubject(this.selectedDate.getUTCDate());
  }

  onNewYearValue(year: number): void {
    this.selectedDate.setUTCFullYear(year);
    this.$onYearChange.next(year);
  }

  onNewMonthValue(month: Month): void {
    this.selectedDate.setUTCMonth(month);
    this.$onMonthChange.next(month);
  }

  onNewDayValue(day: number): void {
    this.selectedDate.setUTCDate(day);
    this.$onDayChange.next(day);
  }

  getMonthGridInDays(month?: Month): DayWrapper[] {
    console.log(WeekDay.toString(0));
    const monthToUse = this.getMonthToUse(month);
    const monthDayCount = this.getMonthDayCount(monthToUse);
    const dayWrappers: DayWrapper[] = [];
    for (let day = 1; day <= monthDayCount; day++) {
      const dayWapper = new DayWrapper(
        day,
        this.getDayWeekDay(day),
        monthToUse
      );
      dayWrappers.push(dayWapper);
    }

    return [
      ...this.getDayWrapperOfPreviousMonth(monthToUse),
      ...dayWrappers,
      ...this.getDayWrapperOfNextMonth(monthToUse),
    ];
  }

  private getDayWrapperOfPreviousMonth(currentMonth: Month): DayWrapper[] {
    const previusMonth = Month.previousMonth(currentMonth);
    const monthInitialWeekDay = this.getMonthInitialWeekDay(currentMonth);
    if (monthInitialWeekDay === WeekDay.Sunday) {
      return [];
    }

    const daysPreviousMonth = Math.abs(monthInitialWeekDay - 7);
    const previusDays: DayWrapper[] = [];
    let previousMonthDayCount = this.getMonthDayCount(previusMonth);
    for (let index = 0; index <= daysPreviousMonth; index++) {
      const dayWapper = new DayWrapper(
        --previousMonthDayCount,
        this.getDayWeekDay(index, previusMonth),
        previusMonth
      );
      previusDays.push(dayWapper);
    }
    return previusDays.reverse();
  }

  private getDayWrapperOfNextMonth(currentMonth: Month): DayWrapper[] {
    const nextMonth = Month.nextMonth(currentMonth);
    const currentMonthLastWeekDay = this.getMonthLastWeekDay(currentMonth);
    if (currentMonthLastWeekDay === WeekDay.Sunday) {
      return [];
    }
    const daysNextMonth = Math.abs(currentMonthLastWeekDay - 7);
    const nextDays: DayWrapper[] = [];
    for (let index = 1; index < daysNextMonth; index++) {
      const dayWapper = new DayWrapper(
        index,
        this.getDayWeekDay(index, nextMonth),
        nextMonth
      );
      nextDays.push(dayWapper);
    }
    return nextDays;
  }

  getDayWeekDay(day: number, month?: Month): number {
    return new Date(
      this.selectedDate.getUTCFullYear(),
      this.getMonthToUse(month),
      day
    ).getDay();
  }

  getMonthToUse(month?: Month): Month {
    return month ? (month === 11 ? 0 : month) : this.selectedDate.getUTCMonth();
  }

  getMonthDayCount(month: Month): number {
    return (
      new Date(this.selectedDate.getUTCFullYear(), month, 0).getUTCDate() + 1
    );
  }

  getMonthInitialWeekDay(month: Month): WeekDay {
    return new Date(this.selectedDate.getUTCFullYear(), month, 1).getUTCDay();
  }

  getMonthLastWeekDay(month: Month): WeekDay {
    return new Date(
      this.selectedDate.getUTCFullYear(),
      month,
      this.getMonthDayCount(month)
    ).getUTCDay();
  }
}
