import type { Breadcrumb } from './breadcrumbs.component';

// Example: Static breadcrumbs
export const STATIC_BREADCRUMBS: Breadcrumb[] = [
  { label: 'Home', url: '/home', icon: 'home-outline' },
  { label: 'Library', url: '/library', icon: 'book-outline' },
  { label: 'Data', url: '/library/data', icon: 'folder-outline', disabled: true },
];

// Example: Usage in a template
export const EXAMPLE_TEMPLATE = `
<lib-breadcrumbs
  [staticBreadcrumbs]="staticBreadcrumbs"
  separator=">"
  [showIcons]="true"
  [maxItems]="5"
  itemClass="custom-breadcrumb-item"
  activeClass="custom-active"
  disabledClass="custom-disabled"
  separatorClass="custom-separator"
></lib-breadcrumbs>
`;

// Example: How to use with dynamic routes
// In your routing module, add data: { breadcrumb: 'Label' } to your routes
// {
//   path: 'profile',
//   component: ProfileComponent,
//   data: { breadcrumb: 'Profile' }
// } 