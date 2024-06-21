import {COMPONENTS_ITEMS} from '@main-project/boiler/main/constants/components.constant';
import {NEBULAR_COMP_ITEMS} from '@main-project/boiler/main/constants/nebularComponents.constants';
import {NbMenuItem} from '@nebular/theme';

export const SIDEBAR_MENU_ITEMS = [
  {
    title: 'Home',
    icon: 'book-outline',
    link: '/main/home',
    home: true,
    pathMatch: 'prefix',
  },
  {
    title: 'Components',
    icon: 'fab fa-buromobelexperte',
    link: '/main/components',
    home: true,
    pathMatch: 'prefix',
    children: [
      {
        title: 'Nebular Components',
        link: '/nebular-comp',
        children: NEBULAR_COMP_ITEMS as NbMenuItem[],
      },
      {
        title: ' Arc Components',
        link: '/arc-comp',
        children: COMPONENTS_ITEMS as NbMenuItem[],
      },
    ],
  },
] as NbMenuItem[];
