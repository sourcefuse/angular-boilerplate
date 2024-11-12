# COMPONENTS

## GanttModule

- The Gantt module is a project management tool that provides a visual representation of a project schedule.
- It displays tasks along a timeline,, allowing users to see task durations, dependencies, and progress at a glance. Users can easily adjust timelines by dragging tasks, set milestones, and allocate resources, making it an effective tool for planning and tracking project timelines.

For further reference you can refer [Here](/projects/arc-lib/src/lib/components/gantt/readme.md)

## Resize

- The ResizeService provides reactive programming features in the application.
- `filter` allows filtering values emitted by an Observable based on a predicate function.
- `map` allows transforming values emitted by an Observable based on a projection function.
- `Subject` allows emitting values to multiple subscribers.
- `stream` allows emitting values to multiple subscribers. It will be used to emit resize events to subscribers
  when an element's size changes.
- we can say the ResizeService provides a convenient way to listen for and observe changes in the size of an
  element in an Angular application.

## ListComponent:

- This component implements the behavior of a search and select component. It has several methods,
  the methods are creating a Set of removed items, assigning a copy of the options to the visibleList array, sorting the list by groups, and subscribing to changes in the value of a search control.
- It also detects changes to the options property and updates the visibleList array accordingly,initialized
  and focuses on the search input field if it exists,emits an event and calls the closed event if the allowInput property is true.
- It also retrieves the name of an item by getting the value of the name field of the item,removes an item
  from the list and emits an event,method checks if an item is a placeholder item,selects the first item in the list if the user presses enter on the search box and there are items in the list and groups the visibleList array according to the groupConfig property.

## Selector

### SelectComponent

- The component is used to display a list of options that can be selected by the user. The selected options
  can be displayed as tags. The component has various inputs and outputs
- The component uses a `SelectionModel` class to keep track of the selected items. The component can be
  configured to allow multiple or single selection by using the multiple input. The component also has a search box to filter the options, and the allowInput input allows the user to enter a custom value that is not in the list.
- The component supports both single and multiple selection modes. options displayed in the dropdown can be
  customized through the options input.The nameField input allows the name of each option to be customized.The disabledField input allows certain options to be disabled.The allowInput input allows the user to enter custom values that are not in the options list.The groupConfig input allows the options to be grouped by a specified property.The search input determines whether a search box is displayed to filter the options.
- The component emits several events, including added, removed, and cleared for changes to the selection
  (s), and `newAdded` and `newRemoved` for changes to custom values entered by the user.It also provides a valueChange output for two-way binding of the selected value(s).

### TestComponent

- This component defines the behavior of a select dropdown in the UI.The options property is an array of
  `NameIdRequired` objects that will be displayed as the available options in the dropdown.
- The multiple, allowInput, disabled, and search properties are boolean values that control various aspects
  of the dropdown behavior. `multiple` specifies whether multiple options can be selected at once, `allowInput` specifies whether the user can input a custom option, `disabled` specifies whether the dropdown is disabled or not, and `search` specifies whether a search box is displayed to filter the options.

## Auth

### Login Component:

- Login component allows users to authenticate themselves by entering their credentials, such as a username and password and also we can login with google.
- The login component typically includes a form with input fields for the user's credentials, as well as a submit button to initiate the login process also gives us option to login via google.
- The login component communicates with a backend server to verify the user's credentials and grant access to the application if the user is authorized. Upon successful authentication, the login component typically stores the user's session information, such as a token or cookie, to allow the user to access protected resources without having to login again.
- The component is a basically for an Angular login page with a Google login option
- The login component may also include features such as password reset, remember me functionality, and social login options.

### Auth Component:

- Auth component is a module that handles the authentication and authorization of users. It is responsible
  for managing user sessions, verifying user credentials, and granting access to protected resources based on the user's role and permissions.

- The auth component typically includes a login as well as a registration form for new users to create an
  account. The component may also handle password reset functionality and provide options for users to manage their accounts

- This component defines an Angular component that extends the `NbAuthComponent` class, which is a part of
  the `@nebular/auth` package. This component is responsible for handling the authentication process in the Angular application. It is using dependency injection to inject the `NbAuthService` and `Location` dependencies into the component's constructor.

  ### Animations

- These animations could be used to provide visual feedback when elements are added or removed fro DOM,
  or to animate UI elements such as buttons or icons.and it also defines two Angular animations, dropdownAnimation and rotateAnimation.

- `DropdownAnimation`: The `dropdownAnimation` trigger defines two states: `void'` and `open`. The `void`
  state is applied to an element that does not exist in the DOM. The `open` state is applied to an element that is visible in the DOM.
- `RotateAnimation` : The `rotateAnimation` trigger defines two states: `closed` and `open`. The `closed`
  state sets the element's rotation angle to 0 degrees. The`open` state sets the element's rotation angle to 180 degrees.
