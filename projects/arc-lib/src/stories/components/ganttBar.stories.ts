import { TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import { GanttBarsComponent } from '@project-lib/components/gantt/components';
import { AnyObject } from '@project-lib/core/api';
import { moduleMetadata } from '@storybook/angular';

import { ThemeModule } from '@project-lib/theme/theme.module';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbThemeModule } from '@nebular/theme';
import { TranslationService } from '@project-lib/core/localization/translation.service';

class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang) {
    // Provide a mock translation object
    return of({
      // Your translations here...
    });
  }
}

// Mock TranslateService
const mockTranslateService = {
  use: () => {},
  setDefaultLang: () => {},
  get: (key) => of(key), // Provide a simple mock translation function
};


export default {
    title: 'Components/GanttBars',
    component: GanttBarsComponent,
    decorators: [
      moduleMetadata({
      //   imports: [TranslateModule], // Add any necessary Angular modules here
      //   providers: [TranslationService,TranslateService,TranslateStore],
      imports: [
          ThemeModule,
          NbThemeModule.forRoot(), // Add this line to enable Nebular styles

        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: MockTranslateLoader },
        }),
        HttpClientTestingModule, // Mock HttpClient requests
      ],
    
      providers: [TranslationService,TranslateService,TranslateStore],
      
         // Add any necessary Angular services/providers here
      }),
    ],
  };
  
  const Template = <T extends AnyObject>(args:GanttBarsComponent<T>) => ({
    component: GanttBarsComponent,
    props: args,
  });

  export const Default = Template.bind({});
  Default.args = {
    item: {
                // Sample data for your GanttTaskValue<T> item
                name: 'Sample Task',
                startDate: new Date('2023-09-01'),
                endDate: new Date('2023-09-10'),
                allocation: 80, // Sample allocation value
                // Add other properties as needed
              },
};
  
