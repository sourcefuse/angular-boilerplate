import { SelectComponent } from '@project-lib/components/selector/select/select.component';
import { moduleMetadata } from '@storybook/angular';

// Import any necessary dependencies or mocks here

export default {
  title: 'Components/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      declarations: [SelectComponent],
      // Add your component to the declarations array
      // You might need to add providers for dependencies here
    }),
  ],
  
};

// export const cdkOverlayOrigin="cdkOverlayOrigin"

export const Default = () => ({
    component: SelectComponent,
    props: {
      idField: 'id',
      showIcon: true,
      nameField: 'name',
      disabledField: 'deleted',
      placeholder: 'Select an option',
      inputMinWidth: 200,
      multiple: true,
      options: [
        { id: 1, name: 'Option 1', deleted: false },
        { id: 2, name: 'Option 2', deleted: true },
        {id :3, name:'Option 3'},
        {id :4, name:'Option 4'}


        // Add more options as needed
      ],
      showClearAll: true,
      search: true,
      disabled: false,
      allowInput: false,
      maxVisibleItems: 5,
      addTagString: 'Create a new tag',
      searchPlaceholder: 'Search options',
      groupConfig: [],
      selectOnEnter: true,
    },
  });
  
  Default.storyName = 'Default';
