import { BehaviorSubject, Subject } from 'rxjs';
import { Month, WeekDay } from '../calendar.prototype';
import { DayWrapper } from './day-wrapper.model';
import { ITimeRangeEvent, TimeRangeEvent } from './time-range-event.model';

export class CalendarData {
  selectedDate: Date;
  selectedWeekDay: number;
  $onYearChange: BehaviorSubject<number>;
  $onMonthChange: BehaviorSubject<Month>;
  $onDayChange: BehaviorSubject<number>;
  $onTimeRangeEventsChange: Subject<ITimeRangeEvent[]>;
  timeRangeEvents: ITimeRangeEvent[];
  currentCalendarGrid: DayWrapper[] = [];

  constructor() {
    this.selectedDate = new Date();
    this.selectedWeekDay = this.selectedDate.getUTCDay();
    this.$onYearChange = new BehaviorSubject(
      this.selectedDate.getUTCFullYear()
    );
    this.$onMonthChange = new BehaviorSubject(this.selectedDate.getUTCMonth());
    this.$onDayChange = new BehaviorSubject(this.selectedDate.getUTCDate());
    this.$onTimeRangeEventsChange = new Subject();
  }

  onTimeRangeEventsChanges(timeRangeEvents: ITimeRangeEvent[]): void {
    this.timeRangeEvents = timeRangeEvents.map(
      (timeRangeEvent) => new TimeRangeEvent(timeRangeEvent)
    );
    this.setCalendarGridEventTimeRanges();
    this.$onTimeRangeEventsChange.next(timeRangeEvents);
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
    const monthToUse = this.getMonthToUse(month);
    this.setDayWrappersOfCurrentMonth(monthToUse);
    this.setDayWrappersOfPreviousMonth(monthToUse);
    this.setDayWrappersOfNextMonth(monthToUse);
    this.setCalendarGridEventTimeRanges();
    return this.currentCalendarGrid;
  }

  setCalendarGridEventTimeRanges(): void {
    console.log(this.timeRangeEvents);
    this.currentCalendarGrid = this.currentCalendarGrid.map((dayWrapper) =>
      dayWrapper.setTimeRangeEvents(this.timeRangeEvents)
    );
  }

  private setDayWrappersOfCurrentMonth(monthToUse: Month) {
    const monthDayCount = this.getMonthDayCount(monthToUse);
    for (let day = 1; day <= monthDayCount; day++) {
      this.currentCalendarGrid.push(
        new DayWrapper(
          new Date(this.selectedDate.getUTCFullYear(), monthToUse, day)
        )
      );
    }
  }

  private setDayWrappersOfPreviousMonth(currentMonth: Month): void {
    const monthInitialWeekDay = this.getMonthInitialWeekDay(currentMonth);
    if (monthInitialWeekDay !== WeekDay.Sunday) {
      const previusMonth = Month.previousMonth(currentMonth);
      const daysPreviousMonth = Math.abs(monthInitialWeekDay - 7);
      let previousMonthDayCount = this.getMonthDayCount(previusMonth);
      for (let index = 0; index <= daysPreviousMonth; index++) {
        this.currentCalendarGrid = [
          new DayWrapper(
            new Date(
              this.selectedDate.getUTCFullYear(),
              previusMonth,
              --previousMonthDayCount
            )
          ),
          ...this.currentCalendarGrid,
        ];
      }
    }
  }

  private setDayWrappersOfNextMonth(currentMonth: Month): void {
    const nextMonth = Month.nextMonth(currentMonth);
    const currentMonthLastWeekDay = this.getMonthLastWeekDay(currentMonth);
    if (currentMonthLastWeekDay !== WeekDay.Sunday) {
      const nextMonthDays = Math.abs(currentMonthLastWeekDay - 7);
      for (let day = 1; day < nextMonthDays; day++) {
        this.currentCalendarGrid = [
          ...this.currentCalendarGrid,
          new DayWrapper(
            new Date(this.selectedDate.getUTCFullYear(), nextMonth, day)
          ),
        ];
      }
    }
  }

  getDayWeekDay(day: number, month?: Month): number {
    return new Date(
      this.selectedDate.getUTCFullYear(),
      this.getMonthToUse(month),
      day
    ).getDay();
  }

  getMonthToUse(month?: Month): Month {
    return month ? (month > 11 ? 0 : month) : this.selectedDate.getUTCMonth();
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

  unsubscribe(): void {
    this.$onDayChange.unsubscribe();
    this.$onMonthChange.unsubscribe();
    this.$onYearChange.unsubscribe();
    this.$onTimeRangeEventsChange.unsubscribe();
  }
}
