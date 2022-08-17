export class EventDayPositioning {
  dayYPosition: number;
  containerRelativeHeight: number;

  private readonly twentyFourHoursInMinutes: number = 1440;

  constructor(fromMs: number, toMs: number) {
    if (fromMs !== toMs) {
      this.dayYPosition = (fromMs * 100) / this.twentyFourHoursInMinutes;
      const difference = toMs - fromMs;
      this.containerRelativeHeight =
        (difference * 100) / this.twentyFourHoursInMinutes;
    } else {
      this.dayYPosition = 0;
      this.containerRelativeHeight = 100;
    }
  }
}
