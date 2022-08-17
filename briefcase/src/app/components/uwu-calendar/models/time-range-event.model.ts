import { EventDayPositioning } from './event-day-positioning.model';
import { IEvent, Event } from './event.model';
import { ITimeRange, TimeRange } from './time-range.model';

export interface ITimeRangeEvent {
  event: IEvent;
  timeRange: ITimeRange;
  eventDayPositioning: EventDayPositioning;
  setEventPositioning(): void;
  doesDateOverlap(date: Date): boolean;
}

export class TimeRangeEvent implements ITimeRangeEvent {
  event: IEvent;
  timeRange: ITimeRange;
  eventDayPositioning: EventDayPositioning;

  constructor(timeRangeEvent: any) {
    this.event = new Event(timeRangeEvent.event);
    this.timeRange = new TimeRange(timeRangeEvent.timeRange);
    this.setEventPositioning();
  }

  doesDateOverlap(date: Date): boolean {
    return this.timeRange.isInRange(date);
  }

  setEventPositioning(): void {
    const fromMs = this.timeRange.from.getMinutesOnDay();
    const toMs = this.timeRange.to.getMinutesOnDay();
    this.eventDayPositioning = new EventDayPositioning(fromMs, toMs);
  }
}
