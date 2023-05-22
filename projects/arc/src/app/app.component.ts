import {Component, OnInit} from '@angular/core';
import {ComponentBaseDirective} from '@project-lib/core/component-base';
import {TranslationService} from '@project-lib/core/localization';
import {IconPacksManagerService} from '@project-lib/theme/services';

@Component({
  selector: 'app-root',
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
