import { Component, OnInit } from '@angular/core';
import { StaticDataService } from 'src/app/core/services/static-data.service';
import { HeaderData } from './header-data.model';
import { HeaderLink } from './header-link.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public headerData: HeaderData;

  constructor(private staticDataService: StaticDataService) {}

  public ngOnInit(): void {
    this.staticDataService.getStaticData<HeaderData>('header').subscribe({
      next: (data: HeaderData) => {
        this.headerData = new HeaderData(data);
      },
    });
  }

  public selectLink(link: HeaderLink): void {
    this.headerData.unselectLinks();
    link.selected = true;
  }
}
