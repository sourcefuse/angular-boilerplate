import { Meta, moduleMetadata } from '@storybook/angular';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NbFocusMonitor, NbFormFieldModule, NbListModule, NbStatusService } from '@nebular/theme';

import { SelectModule } from '@project-lib/components/selector';
import { ListComponent } from '@project-lib/components/selector/list/list.component';
import { TranslateLoader, TranslateService, TranslateStore ,TranslateModule} from '@ngx-translate/core';
import { of } from 'rxjs';

class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang) {
    // Provide a mock translation object
    return of({
      // Your translations here...
    });
  }
}


export default {
  title: 'Components/List',
  component: ListComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SelectModule,
        NbFormFieldModule,
         NbListModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: MockTranslateLoader },
        }),], // Import any necessary modules
      providers: [NbStatusService,NbFocusMonitor,TranslateService,TranslateStore
       
      ],
    }),
  ],
} as Meta;

const Template = (args: ListComponent<any, any, any, any>) => ({
  component: ListComponent,
  moduleMetadata: {
    imports: [NbFormFieldModule, NbListModule], // Import any necessary modules
  },
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  options: [
    // Define your list of options here
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    // Add more options as needed
  ],
  nameField: 'name',
  idField: 'id',
  disabledField: 'deleted',
  itemHeight: 30,
  multiple: false,
  search: true,
  removal: false,
  searchPlaceholder: 'Search...',
  noSearchResultText: 'No results found',
  noDataText: 'No data available',
  addTagString: 'Create a new item',
  selectOnEnter: true,
  allowInput: false,
  showIcon: true,
  groupConfig: [
    // Define your group configuration here
    { fieldName: 'groupField1', value: 'Group 1', groupName: 'Group A' },
    { fieldName: 'groupField2', value: 'Group 2', groupName: 'Group B' },
    // Add more group configurations as needed
  ],
  // Define other args and event handlers as needed
  // For example: selectedOptions, onToggle, onRemove, etc.
};

// You can create additional stories with different configurations as needed
