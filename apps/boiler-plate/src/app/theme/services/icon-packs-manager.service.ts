import {Injectable} from '@angular/core';
import {NbIconLibraries} from '@nebular/theme';

import {ThemeModule} from '../theme.module';
import {KEBAB_SVG} from './icons';

@Injectable({
  providedIn: ThemeModule,
})
export class IconPacksManagerService {
  constructor(private iconLibraries: NbIconLibraries) {}

  /**
   * This function registers the font pack for Font Awesome icons
   *  with a specific icon class prefix.
   */
  registerFontAwesome() {
    this.iconLibraries.registerFontPack('font-awesome', {
      iconClassPrefix: 'fa',
    });
  }

  /**
   * This function registers a font pack with NbIconLibraries.
   * @param {string} name - The name of the font pack being registered.
   * @param params - The `params` parameter is an object that can contain the following optional
   * iconClassPrefix properties:
   */
  registerPack(name: string, params: {iconClassPrefix?: string}) {
    this.iconLibraries.registerFontPack(name, params);
  }
  /**
   * Function registers a custom SVG icon pack using the NbIconLibraries service with
   * a specific name and a set of SVG icons.
   */
  registerSvgs() {
    this.iconLibraries.registerSvgPack('svg-boiler', {
      kebab: KEBAB_SVG, // KEBAB_SVG is constant that provides a mapping of the SVG filenames to their corresponding URLs.
    });
  }
}
