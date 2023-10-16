import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbThemeModule } from '@nebular/theme';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { GanttTooltipComponent } from '@project-lib/components/gantt/components/gantt-tooltip/gantt-tooltip.component';
import { GanttModule } from '@project-lib/components/index';
import { ThemeModule } from '@project-lib/theme/theme.module';
import { moduleMetadata } from '@storybook/angular';
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
  title: 'Components/GanttTooltip',
  component: GanttTooltipComponent,
  decorators: [
    moduleMetadata({
      imports:[
          ThemeModule,
          NbThemeModule.forRoot(), // Add this line to enable Nebular styles
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: MockTranslateLoader },
          }),
          HttpClientTestingModule, // Mock HttpClient requests
        
        ],
      providers: [TranslateService,TranslateStore], //Add your providers here if needed
    }),
  ],
};

const Template = (args: GanttTooltipComponent) => ({
  component: GanttTooltipComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  item: {
    // Define your SubAllocation object here
    // For example:
    date: new Date('2023-09-20'),
    rate: 50,
    allocation: 8,
  },
};

// You may want to create additional stories with different data or scenarios as needed
