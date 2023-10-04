import { moduleMetadata } from '@storybook/angular';

import { AuthService } from '@project-lib/core/auth';
import { LoginComponent } from '@project-lib/components/index';
import { ActivatedRoute } from '@angular/router';
import { ThemeModule } from '@project-lib/theme/theme.module';
import { NbThemeModule } from '@nebular/theme';


export default {
    title: 'Components/Login',
    component: LoginComponent,
    decorators: [
      moduleMetadata({
     imports:[ThemeModule,
        NbThemeModule.forRoot()],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              /* Mock ActivatedRoute data here if needed */
            },
          },
          {
            provide: Location,
            useValue: {
              /* Mock Location methods here if needed */
            },
          },
          {
            provide: AuthService,
            useValue: {
              /* Mock AuthService methods here if needed */
            },
          },
        ],
      }),
    ],
  };

  const Template = (args: LoginComponent) => ({
    component: LoginComponent,
    props: args,
  });
  
  export const Default = Template.bind({});
  Default.args = {};