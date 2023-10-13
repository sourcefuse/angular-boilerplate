import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { NbLayoutModule, NbCardModule, NbStatusService, NbThemeService } from '@nebular/theme';
import { Meta, Story } from '@storybook/angular';
import { LoginComponent } from '@project-lib/components/auth/login/login.component';

// Import your components
// Replace with the actual path

export default {
  title: 'Main Section',
  decorators: [
    moduleMetadata({
      declarations: [], // Add your components here
      imports: [CommonModule, NbLayoutModule, NbCardModule],
      providers:[NbStatusService,NbThemeService]
    }),
  ],
} as Meta;

const Template: Story = () => ({
  template: `
    <div class="main-section">
      <div class="first">
        <nb-card class="h-100 m-0">
          <nb-card-body class="p-0">
            <!-- Include the Login Component here -->
            <app-login></app-login>
          </nb-card-body>
        </nb-card>
      </div>
      <div class="first">
        <nb-layout>
          <nb-layout-column>
            <div class="login-img">
              <img width="90%" src="http://localhost:4200/assets/images/auth/login-img.png" alt="loginImg" />
            </div>
          </nb-layout-column>
        </nb-layout>
      </div>
    </div>
  `,
});

export const MainSection = Template.bind({});

