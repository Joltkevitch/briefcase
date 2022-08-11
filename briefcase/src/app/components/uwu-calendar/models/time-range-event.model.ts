import { EventDayPositioning } from './event-day-positioning.model';
import { IEvent, Event } from './event.model';
import { ITimeRange, TimeRange } from './time-range.model';

export class TimeRangeEvent {
  event: IEvent;
  timeRange: ITimeRange;
  eventDayPositioning: EventDayPositioning;

  constructor(event?: IEvent, timeRange?: ITimeRange) {
    this.event = new Event(event);
    this.timeRange = new TimeRange(timeRange);
    this.setEventPositioning();
  }

  setEventPositioning(): void {
    const fromMs = this.timeRange.from.getSecondsOnDay();
    const toMs = this.timeRange.to.getSecondsOnDay();
    this.eventDayPositioning = new EventDayPositioning(fromMs, toMs);
  }
}
