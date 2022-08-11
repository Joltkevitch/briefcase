import {
  Directive,
  Renderer2,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[uwu-animated-logo]',
})
export class AnimatedLogoDirective {
  @Input() eyeElementRef: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent): void {
    if (this.eyeElementRef) {
      const eyeRectProperties: DOMRect = this.eyeElementRef.nativeElement
        .getClientRects()
        .item(0);

      const top = (eyeRectProperties.top - event.pageY) * -1;
      const left = (eyeRectProperties.left - event.pageX) * -1;

      this.renderer.setStyle(
        this.eyeElementRef.nativeElement,
        'transform',
        `translate(${left}px, ${top}px)`
      );
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.eyeElementRef) {
      this.renderer.setStyle(
        this.eyeElementRef.nativeElement,
        'transform',
        `translate(0px, 0px)`
      );
    }
  }
}
