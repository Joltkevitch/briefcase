/**
 * Allows the developer to change the timing and delay of the ripple animation that comes
 * with the directive.
 *
 * @export
 * @class UwuButtonAnimationOptions
 */
export class UwuButtonAnimationOptions {
  /**
   * Determines if the animation is enable. By default its enable.
   *
   * @type {boolean}
   * @memberof UwuButtonAnimationOptions
   */
  public isEnable: boolean = true;

  /**
   * Animation timing. Default 600ms.
   * @type {number}
   * @memberof UwuButtonAnimationOptions
   */
  public timing: string | number = '600ms';

  /**
   * Animation delay. By default, it does not have a delay.
   * @type {number}
   * @memberof UwuButtonAnimationOptions
   */
  public delay: string | number = "0ms";


  /**
   * Creates an instance of UwuButtonAnimationOptions.
   * @memberof UwuButtonAnimationOptions
   */
  constructor() {}
}
