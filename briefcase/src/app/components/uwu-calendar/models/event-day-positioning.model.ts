export class EventDayPositioning {
  dayYPosition: number;
  dayArea: number;

  private readonly twentyFourHoursInMs: number = 86400;

  constructor(fromMs: number, toMs: number) {
    if (fromMs !== toMs) {
      this.dayYPosition = (fromMs * 100) / this.twentyFourHoursInMs;
      const difference = toMs - fromMs;
      this.dayArea =
        (difference * 100) / this.twentyFourHoursInMs + this.dayYPosition;
    } else {
      this.dayYPosition = 0;
      this.dayArea = 100;
    }
  }
}
