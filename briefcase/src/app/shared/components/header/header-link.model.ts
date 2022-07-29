export class HeaderLink implements IHeaderLink {
  name: string;
  route: string;
  selected: boolean;
  icon: string;
  get class(): string {
    return this.selected ? 'selected' : 'unselected';
  }

  constructor(data: IHeaderLink) {
    Object.assign(this, data);
  }

  public unselect(): HeaderLink {
    this.selected = false;
    return this;
  }
}

export interface IHeaderLink {
  name: string;
  route: string;
  selected: boolean;
  icon: string;
  class?: string;
}
