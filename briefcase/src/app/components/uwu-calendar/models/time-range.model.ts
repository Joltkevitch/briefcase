export interface ITimeRange {
  from: Date;
  to: Date;
}

export class TimeRange implements ITimeRange {
  from: Date;
  to: Date;


  constructor(data?: ITimeRange) {
    this.from = data ? new Date(data!.from) : new Date();
    this.to = data ? new Date(data!.to) : new Date();
  }

}
