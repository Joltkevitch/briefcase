export interface IEvent {
  type: string;
  name: string;
  description: string;
  color: string;
  userName: string;

  assingColor(color: string): IEvent;
}

export class Event implements IEvent {
  type: string;
  name: string;
  description: string;
  color: string;
  userName: string;

  constructor(data?: IEvent) {
    this.type = data?.type ? data!.type : '';
    this.name = data?.name ? data!.name : '';
    this.description = data?.description ? data!.description : '';
    this.color = data?.color ? data!.color : '';
    this.userName = data?.userName ? data!.userName : '';
  }

  assingColor(color: string): Event {
    this.color = color;
    return this;
  }
}
