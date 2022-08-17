import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Month, WeekDay } from '../calendar.prototype';
import { CalendarData } from '../models/calendar-data.model';
import { DayWrapper } from '../models/day-wrapper.model';
import { TimeRangeEvent } from '../models/time-range-event.model';
import { UwuCalendarService } from '../uwu-calenda.service';

@Component({
  selector: 'uwu-calendar-day-selection',
  templateUrl: './calendar-day-selection.component.html',
  styleUrls: [
    './calendar-day-selection.component.scss',
    '../uwu-calendar.component.scss',
  ],
})
export class CalendarDaySelectionComponent implements OnInit, OnDestroy {
  private $timeRangeEventsSubscription: Subscription;
  private $calendarDataSubscription: Subscription;
  private $monthSubscription: Subscription;

  timeRangeEvents: TimeRangeEvent[] = [];
  calendar: CalendarData;
  monthDays: DayWrapper[] = [];
  weekDays: string[] = [];

  constructor(private uwuCalendarService: UwuCalendarService) {}

  ngOnInit(): void {
    this.subscribeToPipelines();
    this.weekDays = WeekDay.convertToStringArray();
  }

  private subscribeToPipelines(): void {
    this.$calendarDataSubscription =
      this.uwuCalendarService.$calendarDataSubject.subscribe(
        (calendarData: CalendarData) => {
          this.onNewCalendarData(calendarData);
        }
      );
  }

  private onNewCalendarData(calendarData: CalendarData): void {
    this.calendar = calendarData;
    this.$monthSubscription = calendarData.$onMonthChange.subscribe(
      (newMonth: Month) => {
        this.onNewMonth(newMonth);
      }
    );
  }

  private onNewMonth(newMonth: Month): void {
     this.monthDays = this.calendar.getMonthGridInDays();
     console.log(this.monthDays)
  }

  ngOnDestroy(): void {
    this.$calendarDataSubscription.unsubscribe();
    this.$monthSubscription.unsubscribe();
  }
}
