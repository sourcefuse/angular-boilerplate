import {SelectComponent} from '@project-lib/components/selector/select/select.component';
import {moduleMetadata} from '@storybook/angular';
import {OverlayModule} from '@angular/cdk/overlay';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbCheckboxModule,
  NbFocusMonitor,
  NbFormFieldComponent,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbStatusService,
  NbTagModule,
} from '@nebular/theme';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {ListComponent} from '@project-lib/components/selector/list/list.component';
import {ThemeModule} from '../../public-api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NbActiveDescendantKeyManagerFactoryService} from '@nebular/theme/components/cdk/a11y/descendant-key-manager';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import {ResizeModule} from '@project-lib/components/index';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {of} from 'rxjs';

// Import any necessary dependencies or mocks here
class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang) {
    // Provide a mock translation object
    return of({
      // Your translations here...
    });
  }
}

const Opt = [
  {id: 1, name: 'Option 1', deleted: false},
  {id: 2, name: 'Option 2', deleted: true},
  {id: 3, name: 'Option 3'},
  {id: 4, name: 'Option 4'},
];

export default {
  title: 'Components/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      declarations: [SelectComponent, ListComponent],

      imports: [
        FormsModule,
        ReactiveFormsModule,
        ThemeModule,
        OverlayModule,
        BrowserAnimationsModule,
        NbLayoutModule,
        NbCheckboxModule,
        NbInputModule,
        NbFormFieldModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: MockTranslateLoader},
        }),
        // NbIconModule.forRoot({ iconPack: 'eva' }),
      ],

      providers: [
        NbStatusService,
        NbFocusMonitor,
        TranslateService,
        TranslateStore,
      ],
      // Add your component to the declarations array
      // You might need to add providers for dependencies here
    }),
  ],
};

// export const cdkOverlayOrigin="cdkOverlayOrigin"

export const Default = () => ({
  component: SelectComponent,

  props: {
    idField: 'id',
    showIcon: true,
    nameField: 'name',
    disabledField: 'deleted',
    placeholder: 'Select an option',
    inputMinWidth: 200,
    multiple: true,
    options: Opt,
    showClearAll: true,
    search: true,
    disabled: true,
    allowInput: true,
    maxVisibleItems: 5,
    addTagString: 'Create a new tag',
    searchPlaceholder: 'Search options',
    groupConfig: [],
    selectOnEnter: true,
  },
});

Default.storyName = 'Default';
