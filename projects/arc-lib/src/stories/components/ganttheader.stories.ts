import { Meta, moduleMetadata } from '@storybook/angular';
import { GanttHeaderComponent } from '../../lib/components/gantt/components/gantt-header/gantt-header.component';
import { GanttModule } from '@project-lib/components/index';
import { NbStatusService, NbThemeModule } from '@nebular/theme';
import { ThemeModule } from '../../public-api';


export default {
    title: 'Components/Gantt Header',
    component: GanttHeaderComponent,
  } as Meta;

  
     // Inject your service here
  
  const Template = (args: GanttHeaderComponent) => ({
    component: GanttHeaderComponent,
    moduleMetadata: {
      imports: [
        ThemeModule,
        NbThemeModule.forRoot(), // Add this line to enable Nebular styles
      ],
      providers: [NbStatusService],
    },
    props: args,
  });
  
  export const Default = Template.bind({});
  Default.args = {
  desc: true,
  name: 'Sample Name',
  showSearch: true,
};

export const NoDescription = Template.bind({});
NoDescription.args = {
  desc: false,
  name: 'No Description',
  showSearch: true,
};

// export const NoSearch = Template.bind({});
// NoSearch.args = {
//   desc: true,
//   name: 'With Search Disabled',
//   showSearch: false,
// };


