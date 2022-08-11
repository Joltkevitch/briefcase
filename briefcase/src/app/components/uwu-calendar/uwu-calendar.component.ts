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
import { TimeRangeEvent } from './models/time-range-event.model';
import { UwuCalendarService } from './uwu-calenda.service';

@Component({
  selector: 'uwu-calendar',
  templateUrl: './uwu-calendar.component.html',
  styleUrls: ['./uwu-calendar.component.scss'],
})
export class CalendarComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() timeRangeEvents: TimeRangeEvent[];

  calendarData: CalendarData;

  $calendarDataSubscription: Subscription;

  constructor(private calendarService: UwuCalendarService) {}

  ngOnInit(): void {
    this.calendarService.onTimeRangeEventsChanges(this.timeRangeEvents);
    this.$calendarDataSubscription =
      this.calendarService.$calendarDataSubject.subscribe(
        (calendarData: CalendarData) => {
          this.calendarData = calendarData;
        }
      );
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.$calendarDataSubscription.unsubscribe();
  }
}
