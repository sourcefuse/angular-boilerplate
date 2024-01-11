import {InjectionToken} from '@angular/core';

import {IToaster} from './i-toaster';

export const TOASTER_SERVICE_KEY = new InjectionToken<IToaster>(
  'Identifier for ToasterService class',
);

export class ToasterConfig {
  /**
   * Determines where on the screen toast have to be rendered.
   * */
  position!: string | ToasterPhysicalPosition;
  /**
   * Status chooses color scheme for the toast.
   * */
  status!: string;
  /**
   * Duration is timeout between toast appears and disappears.
   * */
  timeout!: number;
  /**
   * If preventDuplicates is true
   * then the toast with the same title, message and status will not be rendered.
   * */
  preventDuplicates!: boolean;
  /**
   * CSS Class to be applied to the toast.
   */
  toastClass!: string;
  /**
   * Determines render icon or not.
   * */
  hasIcon!: boolean;
  /**
   * Icon name that can be provided to render custom icon.
   * */
  icon!: string;
}

export enum ToasterPhysicalPosition {
  TOP_RIGHT = 'top-right',
  TOP_LEFT = 'top-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_LEFT = 'bottom-left',
}
