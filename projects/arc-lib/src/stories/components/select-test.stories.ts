import { moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectTestComponent } from '@project-lib/components/selector/tests/select-test.component';

// Import any necessary dependencies or mocks here

export default {
  title: 'Components/SelectTest',
  component: SelectTestComponent,
  decorators: [
    moduleMetadata({
      declarations: [SelectTestComponent],
      imports: [ReactiveFormsModule], // Add ReactiveFormsModule if your component uses forms
      // Add any other providers or imports as needed
    }),
  ],
};
export const Default = () => ({
    component: SelectTestComponent,
    props: {
      options: [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        // Add more options as needed
      ],
      multiple: false,
      allowInput: false,
      disabled: false,
      placeholder: 'Select',
      search: false,
    },
  });
  
  Default.storyName = 'Default';
