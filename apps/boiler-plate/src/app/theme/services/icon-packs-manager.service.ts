import {Injectable} from '@angular/core';
import {NbIconLibraries} from '@nebular/theme';

import {ThemeModule} from '../theme.module';
import {KEBAB_SVG, SOW_SVG} from './icons';

@Injectable({
  providedIn: ThemeModule,
})
export class IconPacksManagerService {
  constructor(private iconLibraries: NbIconLibraries) {}

  registerFontAwesome() {
    this.iconLibraries.registerFontPack('font-awesome', {
      iconClassPrefix: 'fa',
    });
  }

  registerPack(name: string, params: {iconClassPrefix?: string}) {
    this.iconLibraries.registerFontPack(name, params);
  }
  registerSvgs() {
    this.iconLibraries.registerSvgPack('svg-boiler', {
      sow: SOW_SVG,
      kebab: KEBAB_SVG,
    });
  }
}
