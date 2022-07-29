import { HeaderLink } from './header-link.model';

export class HeaderData {
  version: string;
  headerLinks: HeaderLink[];
  constructor(data: any) {
    Object.assign(this, data);
  }

  public unselectLinks(): void {
    this.headerLinks = this.headerLinks.map((link) => link.unselect());
  }
}
