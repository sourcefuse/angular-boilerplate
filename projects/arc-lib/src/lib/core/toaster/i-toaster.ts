// sonarignore:file
import { IAnyObject } from '../i-any-object';
import { ToasterConfig } from './types';

export interface IToaster {
  /**
   * Shows toast with message, title and user config.
   * */
  show(
    message: string,
    title?: string,
    config?: Partial<ToasterConfig>
  ): IAnyObject;
  /**
   * Shows success toast with message, title and user config.
   * */
  success(
    message: string,
    title?: string,
    config?: Partial<ToasterConfig>
  ): IAnyObject;
  /**
   * Shows info toast with message, title and user config.
   * */
  info(message: any, title?: any, config?: Partial<ToasterConfig>): IAnyObject;
  /**
   * Shows warning toast with message, title and user config.
   * */
  warn(message: any, title?: any, config?: Partial<ToasterConfig>): IAnyObject;
  /**
   * Shows primary toast with message, title and user config.
   * */
  default(
    message: any,
    title?: any,
    config?: Partial<ToasterConfig>
  ): IAnyObject;
  /**
   * Shows danger toast with message, title and user config.
   * */
  error(message: any, title?: any, config?: Partial<ToasterConfig>): IAnyObject;
}
