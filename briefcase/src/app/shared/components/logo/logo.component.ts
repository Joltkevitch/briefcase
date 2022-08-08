import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'uwu-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @ViewChild('eye', { static: true }) eyeElementRef: ElementRef;
  constructor() {}
}
