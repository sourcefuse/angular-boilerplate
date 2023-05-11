import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbOptionModule,
  NbRouteTabsetModule,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbTabsetModule,
  NbThemeModule,
  NbToastrModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { TOASTER_SERVICE_KEY } from '../shared/core/toaster';

import { ToasterAdapterService, ToasterService } from './toaster';
import { IconPacksManagerService } from './services';

const themeModules = [
  NbLayoutModule,
  NbSidebarModule,
  NbCardModule,
  NbEvaIconsModule,
  NbIconModule,
  NbAlertModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbOptionModule,
  NbListModule,
  NbOptionModule,
  NbActionsModule,
  NbUserModule,
  NbMenuModule,
  NbContextMenuModule,
  NbRouteTabsetModule,
  NbTooltipModule,
  NbFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  NbSelectModule,
  NbDatepickerModule,
  NbTabsetModule,
  NbDateFnsDateModule,
  NbToggleModule,
  TranslateModule,
  NbSpinnerModule,
];

@NgModule({
  declarations: [],
  providers: [
    ToasterAdapterService,
    {
      provide: TOASTER_SERVICE_KEY,
      useClass: ToasterService,
    },
    NbSidebarService
  ],
  imports: [
    CommonModule,
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    ...themeModules,
  ],
  exports: themeModules,
})
export class ThemeModule {
  static forRoot(theme: string): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [...(NbThemeModule.forRoot({ name: theme }).providers ?? [])],
    };
  }
}
