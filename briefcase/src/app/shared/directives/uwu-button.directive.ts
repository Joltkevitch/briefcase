import { AnimationBuilder, AnimationFactory, style } from '@angular/animations';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[uwu-button]',
})
export class UwuButton implements OnInit {
  @Input() color: 'primary' | 'warn' | 'accent' = 'primary';

  private nativeElement: HTMLElement;
  private styles: string = `
  border: 0.5px solid;
  border-radius: 5px;
  font-weight: 500;
  padding: 0.5em 0px;
  text-align: center;
  width: 100%;
  margin: 0 0.5em;
`;
  constructor(
    private elementRef: ElementRef,
    private animationBuilder: AnimationBuilder,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseover') onHover(): void {
    this.renderer.setAttribute(
      this.nativeElement,
      'style',
      `${this.styles} opacity: 0.8;`
    );
    this.renderer.addClass(
      this.nativeElement,
      `${this.color}-background-color`
    );
  }

  @HostListener('mouseleave') offHover(): void {
    this.renderer.setAttribute(this.nativeElement, 'style', this.styles);
    this.renderer.removeClass(
      this.nativeElement,
      `${this.color}-background-color`
    );
  }

  @HostListener('click', ['$event.target']) onClick(event: any): void {
    console.log(event);
  }

  public ngOnInit(): void {
    this.nativeElement = this.elementRef.nativeElement;
    this.renderer.setAttribute(this.nativeElement, 'style', this.styles);
    this.renderer.addClass(this.nativeElement, `${this.color}-border-color`);
    const d2: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.insertBefore(this.nativeElement.parentElement, d2, this.nativeElement);
  }

  public createAnimation(): void {
    const factory: AnimationFactory = this.animationBuilder.build([style({})]);
    const animation = factory.create(this.nativeElement);
    animation.play();
  }
}
