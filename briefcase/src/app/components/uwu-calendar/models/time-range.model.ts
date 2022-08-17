export interface ITimeRange {
  from: Date;
  to: Date;
  isInRange(outerDate: Date): boolean;
}

export class TimeRange implements ITimeRange {
  from: Date;
  to: Date;

  constructor(data?: ITimeRange) {
    this.from = data ? new Date(data!.from) : new Date();
    this.to = data ? new Date(data!.to) : new Date();
  }

  isInRange(outerDate: Date): boolean {
    const timelessFrom = new Date(
      this.from.getFullYear(),
      this.from.getMonth(),
      this.from.getDate()
    );

    const timelessTo = new Date(
      this.to.getFullYear(),
      this.to.getMonth(),
      this.to.getDate()
    );

    return outerDate >= timelessFrom && outerDate <= timelessTo;
  }
}
