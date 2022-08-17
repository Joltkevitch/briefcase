import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarData } from './models/calendar-data.model';
import { ITimeRangeEvent } from './models/time-range-event.model';
import { UwuCalendarService } from './uwu-calenda.service';

@Component({
  selector: 'uwu-calendar',
  templateUrl: './uwu-calendar.component.html',
  styleUrls: ['./uwu-calendar.component.scss'],
})
export class CalendarComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() timeRangeEvents: ITimeRangeEvent[];

  calendarData: CalendarData;

  $calendarDataSubscription: Subscription;

  constructor(private calendarService: UwuCalendarService) {}

  ngOnInit(): void {
    this.setSubscriptions();
  }

  private setSubscriptions() {
    this.$calendarDataSubscription =
      this.calendarService.$calendarDataSubject.subscribe(
        (calendarData: CalendarData) => {
          this.onNewCalendarData(calendarData);
        }
      );
  }

  private onNewCalendarData(calendarData: CalendarData): void {
    this.calendarData = calendarData;
    this.timeRangeEvents = this.calendarService.setRandomColorsInEvents(
      this.timeRangeEvents
    );
    this.calendarData.onTimeRangeEventsChanges(this.timeRangeEvents);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.calendarData && !changes['timeRangeEvents'].isFirstChange()) {
      this.timeRangeEvents = this.calendarService.setRandomColorsInEvents(
        this.timeRangeEvents
      );
      this.calendarData.onTimeRangeEventsChanges(this.timeRangeEvents);
    }
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.calendarData.unsubscribe();
    this.$calendarDataSubscription.unsubscribe();
  }
}
