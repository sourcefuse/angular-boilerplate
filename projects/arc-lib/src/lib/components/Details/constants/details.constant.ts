import {GanttBarsComponent} from '@project-lib/components/gantt/components';

export const COMPONENTS_DETAILS = {
  button: {
    name: 'button',
    desc: 'Hi i m a button component welcome',
    htmlCode: '<button>Click me</button>',
  },

  list: {
    name: 'list',
    desc: 'Hi i m a list component welcome',
    htmlCode: `<nb-card>
        <nb-card-header>Nebula</nb-card-header>
        <nb-card-body>
          A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
          Originally, nebula was a name for any diffuse astronomical object,
          including galaxies beyond the Milky Way.
        </nb-card-body>
        <nb-card-footer>By Wikipedia</nb-card-footer>
      </nb-card>`,
  },
  radio: {
    name: 'Radio',
    desc: 'Hi i m a radio component welcome',
    htmlCode: `<nb-radio-group [(ngModel)]="selectedOption">
        <nb-radio value="1">Option 1</nb-radio>
        <nb-radio value="2">Option 2</nb-radio>
        <nb-radio value="3">Option 3</nb-radio>
      </nb-radio-group>`,
  },
  'gantt-bars': {
    name: 'Gantt-Bars',
    desc: 'Hi this is gantt bars welcome',
    htmlcode: `<gantt-bars></gantt-bars>`,
    component: GanttBarsComponent,
  },
  'gantt-columns': {
    name: 'Gantt-Bars',
    desc: 'Hi this is gantt coulmns welcome',
    htmlcode: `<gantt-column></gantt-column>`,
  },
  'gantt-header': {
    name: 'Gantt-header',
    desc: 'Hi this is gantt coulmns welcome',
    htmlcode: `<gantt-header></gantt-header>`,
  },
  'gantt-tooltip': {
    name: 'gantt-tooltip',
    desc: 'Hi this is gantt coulmns welcome',
    htmlcode: `<gantt-tooltip></gantt-tooltip>`,
  },
};
