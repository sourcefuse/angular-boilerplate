
import { GanttColumnComponent } from '@project-lib/components/gantt/components';
import { AnyObject } from '@project-lib/core/api';

import { moduleMetadata } from '@storybook/angular';
import { NbThemeModule } from '@nebular/theme';
import { ThemeModule } from '@project-lib/theme/theme.module';

export default {
  title: 'Components/GanttColumn',
  component: GanttColumnComponent,
  decorators: [
    moduleMetadata({
      declarations: [GanttColumnComponent],
      imports: [
        ThemeModule,
        NbThemeModule.forRoot(), // Add this line to enable Nebular styles
      ],
      // Add any additional modules or providers needed for your component
      // imports: [],
      // providers: [],
    }),
  ],
  // argTypes: {
  //   item: { control: 'object' },
  //   contextItems: { control: 'object' },
  //   active: { control: 'boolean' },
  //   showKebab: { control: 'boolean' },
  //   showParentInitials: { control: 'boolean' },
  //   showChildInitials: { control: 'boolean' },
  //   showOverallocatedIcon: { control: 'boolean' },
  //   contextItemFilter: { control: 'object' },
  // },
};

const Template = <T extends AnyObject>(args: GanttColumnComponent<T>) => ({
  component: GanttColumnComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  item: {
    id: 1,
    name: 'Task1',
    // Add other properties of your GanttTaskValue object here
    startDate: new Date(),
    endDate: new Date(),
    subtitle: "robin",
   
    type: 0,
  
    hasChildren: true,
    isParent: false,
    payload: {},
    subAllocations:[],
    // ...
  },
  contextItems: [
    { title: 'Edit', icon: 'edit' },
    { title: 'Delete', icon: 'trash-2' },
    // Add more context menu items as needed
  ],
  active: true,
  showKebab: true,
  showParentInitials: true,
  showChildInitials: true,
  showOverallocatedIcon: true,
  contextItemFilter: (item) => {
    // Define your context item filter logic here
    // This should be a function that filters context items based on the GanttTaskValue input
    // For example:
    // return item.startDate > '2023-09-22' ? true : false;
  },
};


