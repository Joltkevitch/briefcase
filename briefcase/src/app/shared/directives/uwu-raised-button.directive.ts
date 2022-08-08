import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  style,
} from '@angular/animations';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { UwuButtonAnimationOptions } from '../models/uwu-button-animation-options';

/**
 * Directive meant to be applied to `button`s and `a` elements
 * It creates a styled border line and a ripple animation.
 *d
 * @export
 * @class UwuButton
 * @implements {OnInit}
 */
@Directive({
  selector: '[uwu-raised-button]',
})
export class UwuRaisedButtonDirective implements OnInit {
  /**
   * Color type for the button. Following the Material design pattern, primary, warn and accent.
   * By default primary.
   *
   * @type {('primary' | 'warn' | 'accent')}
   * @memberof UwuButton
   */
  @Input() color: 'primary' | 'warn' | 'accent' = 'primary';

  /**
   * Ripple animation options.
   *
   * @type {UwuButtonAnimationOptions}
   * @memberof UwuButton
   */
  @Input() animationOptions: UwuButtonAnimationOptions =
    new UwuButtonAnimationOptions();

  private nativeElement: HTMLElement;

  private wapper: HTMLElement;

  private wapperStyles: string = `
    border-width: 0.5px;
    border-style:  solid;
    border-radius: 5px;
    width: 100%;
    margin: 0 0.5em;
    cursor: pointer;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    text-align: center;
    position: relative;
    overflow: hidden;
  `;
  private styles: string = ` 
    font-weight: 500;
    min-height: 3em;
    display: inline-flex;
    z-index: 5;
    width: 100%;
    position: relative;
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: transparent;
    `;

  /**
   * On click event. Triggered when the user clicks on the element using the directive.
   * If the animation options have the property `isEnable` to true (true by default),
   * we set a ripple animation by creating a span element, setting its possition and then
   * buidling the animation with the use of the `AnimationBuilder`.
   *
   * @param {PointerEvent} event
   * @memberof UwuButton
   */
  @HostListener('click', ['$event']) onClick(event: PointerEvent): void {
    if (this.animationOptions.isEnable) {
      this.setRippleAnimation(event);
    }
  }

  @HostListener('mouseenter') onHover(): void {
    const animation = this.animationBuilder.build([
      style({ boxShadow: 'none' }),
      animate('300ms', style({ boxShadow: '0px 2px 5px -3px white' })),
    ]);

    const player = animation.create(this.wapper);
    player.play();
  }
  @HostListener('mouseleave') offHover(): void {
    const animation = this.animationBuilder.build([
      style({ boxShadow: '0px 2px 5px -3px white' }),
      animate('300ms', style({ boxShadow: 'none' })),
    ]);

    const player = animation.create(this.wapper);
    player.play();
  }

  /**
   * Creates an instance of UwuButton.
   * @param {ElementRef} elementRef
   * @param {AnimationBuilder} animationBuilder
   * @param {Renderer2} renderer
   * @memberof UwuButton
   */
  constructor(
    private elementRef: ElementRef,
    private animationBuilder: AnimationBuilder,
    private renderer: Renderer2
  ) {}

  /**
   * On init, we create a wapper element fro the element using the directive, setting its initial styles and attributes.
   *
   * @memberof UwuButton
   */
  public ngOnInit(): void {
    this.nativeElement = this.elementRef.nativeElement;
    this.wapper = this.renderer.createElement('div');
    this.setInitialAttributes();
    this.wrapElementInsideDiv();
  }

  private setRippleAnimation(event: any): void {
    const ripple: HTMLElement = this.setRippleElement(event);
    const player: AnimationPlayer = this.createRippleAnimation(ripple);
    player.play();
    player.onDone(() => {
      this.onDoneAnimation(ripple);
    });
  }

  private onDoneAnimation(ripple: HTMLElement): void {
    this.renderer.removeChild(this.nativeElement, ripple);
  }


  private createRippleAnimation(element: HTMLElement): AnimationPlayer {
    const animation = this.animationBuilder.build([
      style({ opacity: 0.8, transform: 'scale(0)' }),
      animate(
        '{{timing}} ease-in-out',
        style({ opacity: 0, transform: 'scale(4)' })
      ),
    ]);
    const player = animation.create(element, {
      delay: this.animationOptions.delay,
      params: { timing: this.animationOptions.timing },
    });
    return player;
  }

  private setRippleElement(event: PointerEvent): HTMLElement {
    const ripple: HTMLElement = this.renderer.createElement('span');
    this.renderer.appendChild(this.wapper, ripple);
    this.setInitialRippleStyles(ripple);
    this.setRipplePositioning(ripple, event);
    return ripple;
  }

  private setInitialRippleStyles(ripple: HTMLElement): void {
    this.renderer.setProperty(
      ripple,
      'style',
      `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        background-color: #f6378b;
        opacity: 0;
        z-index: 0;
      `
    );
  }

  private setRipplePositioning(ripple: HTMLElement, event: PointerEvent): void {
    const diameter = Math.max(
      this.wapper.clientWidth,
      this.wapper.clientHeight
    );
    const radius = diameter / 2;
    this.renderer.setStyle(ripple, 'width', `${diameter}px`);
    this.renderer.setStyle(ripple, 'height', `${diameter}px`);
    this.renderer.setStyle(
      ripple,
      'top',
      `${event.clientY - (this.wapper.offsetTop + radius)}px`
    );
    this.renderer.setStyle(
      ripple,
      'left',
      `${event.clientX - (this.wapper.offsetLeft + radius)}px`
    );
  }

  private setInitialAttributes(): void {
    this.renderer.setAttribute(this.wapper, 'style', this.wapperStyles);
    this.renderer.setAttribute(this.nativeElement, 'style', this.styles);
    this.renderer.addClass(this.wapper, `${this.color}-border-color`);
  }

  private wrapElementInsideDiv(): void {
    this.renderer.appendChild(this.nativeElement.parentElement, this.wapper);
    this.renderer.appendChild(this.wapper, this.nativeElement);
  }
}
