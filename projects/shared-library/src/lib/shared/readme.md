# Shared Module

- SharedModule imports and exports several modules from the `@angular` and `ng-zorro-antd` libraries. In the module some of the module which are imported providing UI components some provide theme functionality and some of the module provides `internationalization (i18n)` support for the application.

1. Constants

- The code is defines a constant object called `RegExValidators`, which contains two regular expression patterns as its properties.The first regular expression pattern, named `AlphabetRequired` is a pattern that matches any string that contains at least one alphabet character.The second regular expression pattern, named `NumbersOnly` is a pattern that matches any string that contains only digits (0-9).

- These regular expression patterns can be used to validate user input in forms or other input fields. For example, the `AlphabetRequired` pattern can be used to ensure that a user enters a name with at least one alphabet character, while the` NumbersOnly` pattern can be used to ensure that a user enters a phone number with only digits.

2. Core Module

- The CoreModule provides essential services and functionality that will be used throughout the
  application. It imports various Angular and third-party modules including basic modules which we need for an application and this module also imports NgxPermissionsModule, ApiModule, LocalizationModule, StoreModule, ToasterModule etc.The module extends EnsureModuleLoadedOnce class to ensure that it is only loaded once in the application. for more details refer [here]().

3. Gantt

# Components

## GanttBarComponent

- The component is used to render the bars for the Gantt chart. It is generic and can be used with any type of task value. The component contains properties and methods for rendering the bars and sub-allocations, formatting the allocation values, and translating labels using the `TranslationService` and `TranslateService`.

## GanttColumnComponent

- This Component is used to displays a single column of the Gantt chart. It has several input properties like
- `contextItems`: An array of NbMenuItem objects representing the context menu items to display for the task.
- `showKebab`: A boolean value indicating whether to show a kebab icon for the task or not.
- `showParentInitials`: A boolean value indicating whether to show the initials of the parent task or not.
- `showChildInitials`: A boolean value indicating whether to show the initials of the child tasks or not.
- `showOverallocatedIcon`: A boolean value indicating whether to show an overallocated icon for the task or not.
- `contextItemFilter`: A function that takes a GanttTaskValue object as input and returns a boolean indicating
  whether to display the context menu items for that task or not.

## GanttHeaderComponent

- The component that represents the header of a Gantt chart. It has several inputs, including `searchPlaceholder`
  string representing the placeholder text to be displayed in the search box and `showSearch` A boolean value indicating whether the search box should be displayed or not.

## GanttChartTooltipComponent

- The component which is displayed when hovering over a Gantt chart bar.The tooltip displays information about a
  SubAllocation object, including its start and end dates, allocation rate, and allocated hours per day. The SubAllocation object is passed to the component using the item input property.The component has methods for formatting the allocation rate and allocated hours per day values into readable strings

# Service:

## GanttService

- The GanttService class has several private properties, including ` _data`, `_overlays`, `_tooltipOverlay`,
  `_eventHandlers` etc
- The render method takes an ElementRef representing the container containing options to configure the Gantt
  chart. The method sets several properties such as the `row_height, bar_height, scale_height`, and readonly properties. It also sets up the layout of the Gantt chart and registers event handlers for task clicks and
  grid header clicks.

# Timeline-scale

- `MonthlyScaleService` : This is an service for generating a monthly scale for a Gantt chart It provides a configuration for displaying the Monthly timeline scale for a Gantt chart. The `config()` method, which returns an array of objects representing the different units in the timeline scale.The `GanttScaleService` interface defines a contract for a service that can be used to generate scale configurations for different timelines. The `MonthlyScaleService` class implements this interface by defining the scale property, which is set to Timelines.Monthly

- `QuarterlyScaleService` : This is an service for generating a quarterly scale for a Gantt chart. The service implements the `GanttScaleService` interface and provides a `config()` method that returns an array of scale configuration objects.The `QuarterlyScaleService` class has a scale property that is set to Timelines.Quarterly, indicating that this service generates a quarterly scale.

- `WeeklyScaleService` : This defines service called `WeeklyScaleService` which implements the `GanttScaleService` interface. The `GanttScaleService` interface defines the contract that all Gantt scale services must adhere to. The `WeeklyScaleService` service provides a configuration for a Gantt chart with a weekly timeline. The configuration includes an array of objects that specify the scale units, step size, and formatting for each unit.The `config()` method returns an array of two objects. The first object represents the weekly scale unit and formats the date using the `_formatWeeklyScale` private method. The second object represents the daily scale unit and formats the date using the `toLocaleString()`

# GanttModule

- This is an Angular module called GanttModule which declares and exports a components and Modules related to Gantt.The module also provides three different `GanttScaleService` implementations as providers using the GANTT_SCALES injection token: `MonthlyScaleService`, `WeeklyScaleService`, and `QuarterlyScaleService`as we discuss above

4. Resize

- The ResizeService provides reactive programming features in the application.
- `filter` allows filtering values emitted by an Observable based on a predicate function.
- `map` allows transforming values emitted by an Observable based on a projection function.
- `Subject` allows emitting values to multiple subscribers.
- `stream` allows emitting values to multiple subscribers. It will be used to emit resize events to subscribers
  when an element's size changes.
- we can say the ResizeService provides a convenient way to listen for and observe changes in the size of an
  element in an Angular application.

5. Select

# ListComponent:

- This component implements the behavior of a search and select component. It has several methods,
  the methods are creating a Set of removed items, assigning a copy of the options to the visibleList array, sorting the list by groups, and subscribing to changes in the value of a search control.
- It also detects changes to the options property and updates the visibleList array accordingly,initialized and
  focuses on the search input field if it exists,emits an event and calls the closed event if the allowInput property is true.
- It also retrieves the name of an item by getting the value of the name field of the item,removes an item from
  the list and emits an event,method checks if an item is a placeholder item,selects the first item in the list if the user presses enter on the search box and there are items in the list and groups the visibleList array according to the groupConfig property.

# SelectComponent

- The component is used to display a list of options that can be selected by the user. The selected options can
  be displayed as tags. The component has various inputs and outputs
- The component uses a `SelectionModel` class to keep track of the selected items. The component can be
  configured to allow multiple or single selection by using the multiple input. The component also has a search box to filter the options, and the allowInput input allows the user to enter a custom value that is not in the list.
- The component supports both single and multiple selection modes. options displayed in the dropdown can be
  customized through the options input.The nameField input allows the name of each option to be customized.The disabledField input allows certain options to be disabled.The allowInput input allows the user to enter custom values that are not in the options list.The groupConfig input allows the options to be grouped by a specified property.The search input determines whether a search box is displayed to filter the options.
- The component emits several events, including added, removed, and cleared for changes to the selection(s), and
  `newAdded` and `newRemoved` for changes to custom values entered by the user.It also provides a valueChange output for two-way binding of the selected value(s).

# TestComponent

- This component defines the behavior of a select dropdown in the UI.The options property is an array of
  `NameIdRequired` objects that will be displayed as the available options in the dropdown.
- The multiple, allowInput, disabled, and search properties are boolean values that control various aspects of
  the dropdown behavior. `multiple` specifies whether multiple options can be selected at once, `allowInput` specifies whether the user can input a custom option, `disabled` specifies whether the dropdown is disabled or not, and `search` specifies whether a search box is displayed to filter the options.

# Animations

- These animations could be used to provide visual feedback when elements are added or removed from the DOM, or to animate UI elements such as buttons or icons.and it also defines two Angular animations, dropdownAnimation and rotateAnimation.

- `DropdownAnimation`: The `dropdownAnimation` trigger defines two states: `void'` and `open`. The `void` state
  is applied to an element that does not exist in the DOM. The `open` state is applied to an element that is visible in the DOM.
- `RotateAnimation` : The `rotateAnimation` trigger defines two states: `closed` and `open`. The `closed` state
  sets the element's rotation angle to 0 degrees. The`open` state sets the element's rotation angle to 180 degrees.
