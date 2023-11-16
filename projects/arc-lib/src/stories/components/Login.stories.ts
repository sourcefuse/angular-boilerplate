import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@project-lib/components/auth/login/login.component';
import { LoginPageComponent } from '@project-lib/components/auth/login-page/login-page.component';
import { AuthModule, ThemeModule } from '../../public-api';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@project-lib/core/auth';
 // Adjust the import path

const meta= {
  title: 'Examples/LoginPage',
  component: LoginPageComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule,AuthModule,ThemeModule],
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
      ], // You may need to import necessary modules
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

