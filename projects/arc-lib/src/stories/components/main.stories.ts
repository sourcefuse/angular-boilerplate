import {Meta, moduleMetadata, StoryObj} from '@storybook/angular'; // Import your component
import {
  NbLayoutModule,
  NbActionsModule,
  NbSidebarModule,
  NbMenuModule,
  NbUserModule,
  NbContextMenuModule,
  NbSidebarService,
  NbMenuService,
  NbThemeService,
  NbThemeModule,
} from '@nebular/theme'; // Import any necessary Nebular modules
import {MainComponent} from '@main-project/boiler/main/main.component';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '@project-lib/core/auth';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {NbMenuInternalService} from '@nebular/theme/components/menu/menu.service';
import {ThemeModule} from '../../public-api';
import {MainRoutingModule} from '@main-project/boiler/main/main-routing.module';
import {HomeModule} from '@main-project/boiler/main/home/home.module';
import {CommonModule} from '@angular/common';
import {of} from 'rxjs';

class AuthServiceMock {
  currentUser() {
    return of('xyz');
  }
}

class MenuServiceMock {
  onItemClick() {
    return of('xyz');
  }
  onSubmenuToggle() {
    return of('abc');
  }
}

class NbSidebarServiceMock {
  onToggle() {
    return of('xyz');
  }
  onExpand() {
    return of('abc');
  }
  onCollapse() {
    return of('egf');
  }
  onCompact() {
    return of('ab');
  }
}

const meta = {
  title: 'Examples/HomePage', // Set the title for your component
  component: MainComponent, // Specify the component
  decorators: [
    moduleMetadata({
      declarations: [], // Declare your component
      imports: [
        NbLayoutModule,
        NbThemeModule.forRoot(),
        NbActionsModule,
        NbSidebarModule,
        NbMenuModule.forRoot(),
        NbUserModule,
        NbContextMenuModule,
        ThemeModule,
        MainRoutingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: NbSidebarService,
          useClass: NbSidebarServiceMock,
        },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },

        {
          provide: NbMenuService,
          useClass: MenuServiceMock,
        },

        {
          provide: IconPacksManagerService,
          useValue: {
            registerSvgs: () => {},
          },
        },
        NbThemeService,
      ],
    }),
  ],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// Define your story using the Story function

// Define different scenarios or variations of your component
export const Default: Story = {
  render: () => ({
    props: {
      imageUrl: 'assets/images/Illustration.svg',
      altText: 'my image',
    },
  }),
};
