import {Component, OnInit} from '@angular/core';
import {ComponentBaseDirective} from '@boiler/core/component-base';
import {TranslationService} from '@boiler/core/localization/translation.service';
import {IconPacksManagerService} from '@boiler/theme/services/icon-packs-manager.service';

@Component({
  selector: 'boiler-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends ComponentBaseDirective implements OnInit {
  title = 'boiler-plate-ui';
  constructor(
    private readonly iconMgr: IconPacksManagerService,
    private readonly languageTranslateService: TranslationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.languageTranslateService.init();
    this.iconMgr.registerFontAwesome();
    this.iconMgr.registerSvgs();
  }
}
