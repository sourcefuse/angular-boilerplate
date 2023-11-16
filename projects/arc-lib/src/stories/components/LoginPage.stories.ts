
import {Meta, StoryObj, moduleMetadata} from '@storybook/angular';
import {AuthService} from '@project-lib/core/auth';
import {LoginComponent} from '@project-lib/components/index';
import {ActivatedRoute} from '@angular/router';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbThemeModule} from '@nebular/theme';

const meta = {
  title: 'Components/Login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [ThemeModule, NbThemeModule.forRoot()],
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
} as Meta;
export default meta;

/// from official docs
type Story = StoryObj<typeof meta>;

//append the path of image relative to the staticdir in main.ts
export const WithAnImage: Story = {
  render: () => ({
    props: {
      imageUrl: '/images/auth/angular.png',
      altText: 'my image',
    },
  }),
};
