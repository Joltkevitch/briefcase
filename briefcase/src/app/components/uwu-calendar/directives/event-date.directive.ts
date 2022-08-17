import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ITimeRangeEvent } from '../models/time-range-event.model';

@Directive({
  selector: '[day-event]',
})
export class DayEventDirective implements OnInit {
  @Input('dayEvent') dayEvent: ITimeRangeEvent;

  private nativeElement: HTMLElement;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.nativeElement = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.applyGeneralStyles();
    this.setPosition();
    this.setHeight();
  }

  private applyGeneralStyles(): void {
    this.renderer.setStyle(
      this.nativeElement,
      'background',
      this.dayEvent.event.color
    );
    this.renderer.setStyle(this.nativeElement, 'opacity', 0.3);
    this.renderer.setStyle(
      this.nativeElement,
      'border',
      `1px solid${this.dayEvent.event.color}`
    );
  }
  private setPosition(): void {
    this.renderer.setStyle(
        this.nativeElement,
        'top',
        `${this.dayEvent.eventDayPositioning.dayYPosition}%`
      );
  }
  private setHeight(): void {
    this.renderer.setStyle(
        this.nativeElement,
        'height',
        `${this.dayEvent.eventDayPositioning.containerRelativeHeight}%`
      );
  }
}
