# Sourceloop Shared Library 

<!-- DOCUMENTATION -->

# Description

- In an Angular multiproject workspace, a shared library is a package that contains reusable code and 
  functionality that can be used across multiple projects within the workspace.

- A shared library can include components, services, pipes, directives, and other modules that can be used 
  by other projects in the workspace. By using a shared library, you can avoid duplicating code and functionality across multiple projects, which can save time and effort.

- By separating your reusable code into a shared library, you can also maintain consistency and 
  standardization across your projects. If you need to make changes to the shared code, you can update the library and all projects that use it will be automatically updated as well. a shared library is a powerful tool for managing code and functionality in an Angular multiproject workspace, and can help improve code quality, reduce duplication, and increase productivity.

This project is based on Angular CLI on version 14.0.0.

# Prerequisite

Run `npm install -g @angular/cli` for Angular CLI & NPM installed
Run `npm i @angular/material` for Angular material

# Code scaffolding

Run ng generate component component-name to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Project Features

Angular shared library  provides various features and components to help developers get started with their projects quickly. Here are some of the features and components that provides:

# Auth Module:

This Module provides the following features:

## Login Component:

- Login component allows users to authenticate themselves by entering their credentials, such as a username
  and password and also we can login with google.
- The component is a basically for an Angular login page with a Google login option
- The login component may also include features such as password reset, remember me functionality, and
  social login options.

## Auth Component:

- Auth component is a module that handles the authentication and authorization of users. It is responsible
  for managing user sessions, verifying user credentials, and granting access to protected resources based on the user's role and permissions.
- The auth component typically includes a login as well as a registration form for new users to create an
  account. The component may also handle password reset functionality and provide options for users to manage their accounts

For more details,refer [here]()

# Core:

## API:

- Adapters: We are using 3 adapters named `anyAdapter` , `countAdapter` and `nameAdapter`. We
  use these adapters for manipulating the data, as we get the data from the api.

- Commands: The various commands provided are `del-api.command` , `get-api.command`,
  `get-list-api.command`,`patch-api.command`,`post-api.command` and `put-api.command`.These are used for modifying the data through API.These serves as a base class for other classes that inherit from it and provide specific implementation details.

- Models: We are using 3 models named `count.model`,`named-id-required.model` and
  `named-id. model`. In these models we are using model based validations.

## Auth:

- Adaptors: Two adapter service provided are `logged-in-user-adapter.service` and
  `login-adapter. service` which helps in adapting API response to a LoggedInUserDM model representing a logged-in user or adapting the LoginModel object to the API request format and adapting the API response which allows for a separation of concerns between the API response data and the application data model.

- Commands: It provides implementation of a commands that makes a `Get/Post/Patch` request to the
  API endpoint for triggering forget password functionality,`retrieving` current user's data,authentication token,initiating a Google Auth login flow and logout etc.

- Guards: Two guards provided are `LoggedInGuard` and `AuthGuard` used to control
  access to certain routes or pages in the application.Guards can be used to check if the user has permission to access a certain route, if the user is logged in, or to perform other types of authentication or authorization check.

- Models: We are using 4 models named `logged-in-user.model`,`loggedin-response.model`,
  `login. model` and `token-response.model` that represents user's data when they are logged in,response from a login API call(code),data that is required for a user to authenticate or log
  in to a system and the the response from server after a user gets authenticated
  and obtains a new access token and refresh token.

## Decorator:

We are using 2 decorators named `required.decorator` and `validate.decorator`.

- The `required` decorator is used to mark properties in a model as required and adds the
  property name to a list of required properties stored in metadata.
- The `validate` decorator is used as a class decorator to validate the property constraints of
  a parameterized constructor. The required decorator adds metadata to the target constructor and validate uses `Reflect.getMetadata` to retrieve the required properties and validate them in the constructor.
  These decorators help to ensure that required properties are not left undefined or null.

## Interceptors:

We are using 3 Interceptors named `auth.interceptor`,`error.interceptor` and `session-recovery.interceptor`. These interceptors are responsible for adding an authorization header to requests that require authentication, checks for errors that occur during HTTP requests and
displays error messages and also refreshes the user's authentication token when the session gets expired.

## Localization:

We are using i18n module as a language translator where we are using 3 files as follows :

- Enums: `language.enum` defines the set of named values for various languages.

- Module: We are using `localization.module` while using the module we are using data from enum
  too and according to enums value we translate the language and `translation service` is called

- Service: The translationService provides localization functionality to the application. It
  depends on `@ngx-translate/core` library to handle translations allowing users to select their preferred language for the application & to provide appropriate translations based on that preference.

## Env Resolver Service:

The purpose of this service (implements the Resolve interface and is responsible for resolving the environment configuration ) is to retrieve environment configuration data from a store (SystemStoreFacadeService) and make it available to components before they are displayed.

## Store:

Store module provides `store-keys.enum`,`user-session-store.service` and
`system-store-facade.service`. These are used to fetch and update environment configurations.
It also updates the environment configurations in memory and logs the change in the logging system.Also, provides methods to save, retrieve, and remove user session data such as access token, refresh token, user information, and last accessed URL.

## Toaster:

- In this we are using toaster named Itoaster this is a user interface component that displays
  notifications or alerts to users in a non-intrusive way. Itoaster notifications typically appear as small pop-up messages that provide feedback or information.

- In order to use it ,one can incorporate `ToasterService` [here]()
  provided in theme module which provides methods to display toast messages using the NbToastrService from the `@nebular/theme package`. The service has methods to show different types of toast messages such as success, info, warning, error, and default, and allows customization of the toast messages through an optional config parameter. The `ToasterAdapterService` is used to adapt the config object to the format expected by the NbToastrService. The service implements the IToaster interface which defines the method signatures for displaying toast messages.

For more detail, refer [here]()

## Theme:

Theme module in our microservice is usually used in conjunction with Nebular, Nebular is a customizable Angular UI Library and styles designed to create a consistent, modern user interface. Nebular includes a set of pre-defined themes, but you can also create your own custom themes also.

Also, provides methods to register icon packs with the NbIconLibraries service. The NbIconLibraries service is a part of the nebular UI library and is used to manage icon libraries and packs.

For more details,refer [here]()

# Shared:

- Select:This component supports auto-completion, filtering of options by search terms, and the
  ability to add new tags that are not present in the list of options. There are also several configurable options, such as the ability to select multiple items, the placeholder text for the input field, and the width and height of the dropdown panel and provides a reusable component for displaying a searchable list of items with a selectable checkbox and dropdown with customized states.

- Gantt:
  In this microservice we are using bb.gantt,bb.gantt charts,bb.gantt bars a Gantt chart is a user interface component that displays project tasks or events over a timeline, allowing users to visualize the schedule and progress of a project.

For more details,refer [here]()

# Usage

Clone the boilerplate project repository to your local machine:
https://github.com/sourcefuse/angular-boilerplate

Install the project dependencies by running the following command in your terminal:
`npm install`

# Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
