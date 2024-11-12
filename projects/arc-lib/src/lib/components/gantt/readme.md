# Gantt Module

## Overview

The Gantt Module is designed to display project timelines, resource allocation, and scheduling in a visually intuitive way. This module includes several components, each handling a specific aspect of the Gantt chart visualization.

## GanttBarComponent

- The component is used to render the bars for the Gantt chart. It is generic and can be used with any type of task value. The component contains properties and methods for rendering the bars.
- GanttBarsComponent is responsible for visualizing resource allocations in a Gantt chart format. It supports:

  1. Actual allocations with sub-allocations
  2. Hour and rate displays
  3. Tooltips for detailed information
  4. Over-allocation indicators.

### Usage Example

```
// Component usage

<arc-gantt-bars
  [item]="resourceItem"
  [allocationTypes]="types"
  [allocationBase]="40">
</arc-gantt-bars>
```

## GanttColumnComponent

This component handles hierarchical employee data display with expandable parent-child relationships, initials display, and overallocation warnings.

- This Component is used to displays a single column of the Gantt chart. It has several input properties
  like
- `contextItems`: An array of NbMenuItem objects representing the context menu items to display for the
  task.
- `showKebab`: A boolean value indicating whether to show a kebab icon for the task or not.
- `showParentInitials`: A boolean value indicating whether to show the initials of the parent task or not.
- `showChildInitials`: A boolean value indicating whether to show the initials of the child tasks or not.
- `showOverallocatedIcon`: A boolean value indicating whether to show an overallocated icon for the task or
  not.
- `contextItemFilter`: A function that takes a GanttTaskValue object as input and returns a boolean
  indicating whether to display the context menu items for that task or not.

### Usage Example

```
// Component usage

<arc-gantt-column
  [items]="employeeData"
  [showParentInitials]="true"
  [showChildInitials]="true"
  [showOverallocatedIcon]="true"
  (itemSelected)="handleItemSelection($event)">
</arc-gantt-column>
```

## GanttHeaderComponent

- This component provides a customizable header with an optional project title, description indicator, and search functionality.
- The GanttHeaderComponent serves as the top section of a Gantt chart, featuring:

  1. Project title display
  2. Optional description indicator
  3. Configurable search input field

### Usage Example

```
// Component usage

<arc-gantt-header
  [name]="'Project Alpha'"
  [desc]="true"
  [showSearch]="true"
  [searchPlaceholder]="'Search resources...'">
</arc-gantt-header>
```

## GanttTooltipComponent

- The GanttTooltipComponent provides a detailed popup
  tooltip displaying:

  1. Hours per day allocation
  2. Hourly billing rates
  3. Project date ranges
  4. Associated deals with status

### Usage Example

```
// Component usage

<arc-gantt-tooltip
  [itemData]="tooltipData"
  [allocationMap]="shadowResourceMap">
</arc-gantt-tooltip>
```

## TimelineComponent

- The timeline component that implements a customizable Gantt chart timeline with multiple scale units, tooltips, and advanced configuration options. This component integrates with the DHTMLX Gantt library and provides extensive customization capabilities.
- The TimelineComponent is a generic component that provides:

  1. Multi-level time scale visualization
  2. Customizable columns and bars
  3. Context menu integration
  4. Infinite scrolling support
  5. Custom tooltip system
  6. Advanced grouping and filtering

### Usage Example

```
// Component usage

@Component({
  selector: 'app-custom-gantt',
  template: `
    <arc-timeline-gantt
      [columnComponent]="customColumn"
      [barComponent]="customBar"
      [defaultScale]="'month'"
      [showSearch]="true"
      [infiniteScroll]="true">
    </arc-timeline-gantt>
  `
})
```

## GanttZoomBarComponent

- This Component provides zoom and fit-to-screen controls for a Gantt chart interface. This component offers intuitive controls for adjusting the Gantt chart's view scale and fit.
- The GanttZoomBarComponent is a control panel  
  component that provides:
  1. Zoom in/out functionality
  2. Fit to screen capability

### Usage Example

```
// Component usage

<arc-gantt-zoombar></arc-gantt-zoombar>
```

## Service:

### GanttService

- The GanttService class has several private properties, including ` _data`, `_overlays`, `_tooltipOverlay`,
  `_eventHandlers` etc
- The render method takes an ElementRef representing the container containing options to configure the Gantt
  chart. The method sets several properties such as the `row_height, bar_height, scale_height`, and readonly properties. It also sets up the layout of the Gantt chart and registers event handlers for task clicks and
  grid header clicks.

### Timeline-scale

- `MonthlyScaleService` : This is an service for generating a monthly scale for a Gantt chart It provides a configuration for displaying the Monthly timeline scale for a Gantt chart. The `config()` method, which returns an array of objects representing the different units in the timeline scale.The `GanttScaleService` interface defines a contract for a service that can be used to generate scale configurations for different timelines. The `MonthlyScaleService` class implements this interface by defining the scale property, which is set to Timelines.Monthly

- `QuarterlyScaleService` : This is an service for generating a quarterly scale for a Gantt chart. The service implements the `GanttScaleService` interface and provides a `config()` method that returns an array of scale configuration objects.The `QuarterlyScaleService` class has a scale property that is set to Timelines.Quarterly, indicating that this service generates a quarterly scale.

- `WeeklyScaleService` : This defines service called `WeeklyScaleService` which implements the `GanttScaleService` interface. The `GanttScaleService` interface defines the contract that all Gantt scale services must adhere to. The `WeeklyScaleService` service provides a configuration for a Gantt chart with a weekly timeline. The configuration includes an array of objects that specify the scale units, step size, and formatting for each unit.The `config()` method returns an array of two objects. The first object represents the weekly scale unit and formats the date using the `_formatWeeklyScale` private method. The second object represents the daily scale unit and formats the date using the `toLocaleString()`

## GanttDemoComponent

- This component demonstrating a full-featured Gantt chart implementation with sidebars, headers, tooltips, and timeline visualization.
- The GanttDemoComponent showcases various features of a Gantt chart implementation including:

  1. Resource allocation visualization
  2. Timeline management
  3. Project hierarchy display
  4. Custom tooltips
  5. Search functionality
  6. Header customization

### Resource Allocation

```
allocationTypes = {
  PlaceholderResource: 'PlaceholderResource'
};

allocationBase = 40;

item = {
  type: 'ActualResource',
  allocation: 32,
  payload: {
    dealStage: 'closedown',
    billingRate: 100
  },
  subAllocations: [
    {percent: 50, allocation: 20, allocatedHours: 20, classes: ['class1']},
    {percent: 50, allocation: 15, allocatedHours: 15, classes: ['class2']}
  ]
};
```

### Sample Data

```
items: empData[] = [
  {
    name: 'John Doe',
    subtitle: 'Manager',
    hasChildren: false,
    isParent: false,
    $open: false,
    overallocated: false
  },
  // ... additional employees
];
```

### Usage

1. Import the required modules and configure them in your AppModule.
2. Set up data models to define resources, tasks, and allocations.
3. Configure the GanttDemoComponent route `/gantt-demo` for easy access.
