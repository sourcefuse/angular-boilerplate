# Sourceloop Angular Boiler Plate

<!-- DOCUMENTATION -->

# Description

This boilerplate project is a project set up that can be easily altered to create new projects. The user is able to use in the original project, its foundation, and its structure to set up a new one without changing the original.

This project is based on Angular CLI on version 14.0.0.

# Prerequisite

Run `npm install -g @angular/cli` for Angular CLI & NPM installed
Run `npm i @angular/material` for Angular material

# Code scaffolding

Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

## Project Features

Angular Boilerplate is a starter template for Angular applications that provides various features and components to help developers get started with their projects quickly. Here are some of the features and components that the boilerplate provides:

# Auth Module:

This Module provides the following features:

## Login Component:

- login component allows users to authenticate themselves by entering their credentials, such as a username and password. The login component typically includes a form with input fields for the user's credentials, as well as a submit button to initiate the login process.

- login component communicates with a backend server to verify the user's credentials and grant access to the application if the user is authorized. Upon successful authentication, the login component typically stores the user's session information, such as a token or cookie, to allow the user to access protected resources without having to log in again.

## Auth Component:

Auth component handles the authentication and authorization of users. It is responsible for managing user sessions, verifying user credentials, and granting access to protected resources based on the user's role and permissions.

The auth component typically includes a login as well as a registration form for new users to create an account. The component may also handle password reset functionality and provide options for users to manage their accounts.

# Core Component:

## API:

- Adapters:We are using 3 adapters in this microservice named "anyAdapter,countAdapter,nameAdapter".We use these adapters for manipulating the data, as we get the data from the api.

- Commands:In this microservice we are using "del-api.command,get-api.command,get-list-api.command,patch-api.command,post-api.command,put-api.command" We are using all the commands for
  modifying the data through API.

- Models:We are using 3 models named "count.model,named-id-required.model,named-id.model" In these models we are using model based validations.

## Auth:

- Adaptors:Two adapter service provided are "logged-in-user-adapter.service and login-adapter.
  service" which helps in adapting API response to a LoggedInUserDM model representing a logged-in user or adapting the LoginModel object to the API request format and adapting the API response which allows for a separation of concerns between the API response data and the application data model.

- Commands:It provides implementation of a commands that makes a Get/Post/patch request to the
  API endpoint for triggering forget password functionality,retrieving current user's data,authentication token,initiating a Google OAuth login flow and logout etc.

- Guards:In microservice 2 guards provided are "LoggedInGuard and AuthGuard" used to control
  access to certain routes or pages in the application.Guards can be used to check if the user has permission to access a certain route, if the user is logged in, or to perform other types of authentication or authorization check.

- Models: We are using 4 models named "logged-in-user.model,loggedin-response.model,login.model,
  token-response.model" that represents user's data when they are logged in,response from a login API call(code),data that is required for a user to authenticate or log
  in to a system and the the response from server after a user gets authenticated
  and obtains a new access token and refresh token.

## Decorator:

In this microservice we are using 2 decorators named "required.decorator,validate.decorator",In these decorator we are providing our requirement for the data that which data needs to be fill,and than validate the data.

## Interceptors:

In this microservice we are using 3 Interceptors named auth.interceptor,error.interceptor,session-recovery.interceptor.So, in these we are providing header as token & checking when that gives us the error and also checking when will session get expired.

## Localization:

In this microservice we are using i18n module as a language translator & where we are using 3 files as follows :

- Enums:we are using language.enum in this microservice where this files define the set of named values.

- Module:We are using localization.module while using the module we are using data from enum too and according to enums value we translate the language and call the service

- Service: The translationService provides localization functionality to the application. It depends on @ngx-translate/core library to handle translations allowing users to select their preferred language for the application & to provide appropriate translations based on that preference.

## Env Resolver Service:

The purpose of this service is to retrieve environment configuration data from a store (SystemStoreFacadeService) and make it available to components before they are displayed.

## Store:

In store module we have following features named store-keys.enum,user-session-store.service
system-store-facade.service.These are used to fetch and update environment configurations.
It also updates the environment configurations in memory and logs the change in the logging system.Also, provides methods to save, retrieve, and remove user session data such as access token, refresh token, user information, and last accessed URL.

## Theme:

Theme module in our microservice is usually used in conjunction with Nebular, Nebular is a customizable Angular UI Library and styles designed to create a consistent, modern user interface. Nebular includes a set of pre-defined themes, but you can also create your own custom themes also.

Also, provides methods to register icon packs with the NbIconLibraries service. The NbIconLibraries service is a part of the nebular UI library and is used to manage icon libraries and packs.

## Toaster:

In this microservice we are using toaster named Itoaster this is a user interface component that displays notifications or alerts to users in a non-intrusive way. Itoaster notifications typically appear as small pop-up messages that provide feedback or information.

# Shared:

- Select:This component supports auto-completion, filtering of options by search terms, and the
  ability to add new tags that are not present in the list of options. There are also several configurable options, such as the ability to select multiple items, the placeholder text for the input field, and the width and height of the dropdown panel and provides a reusable component for displaying a searchable list of items with a selectable checkbox and dropdown with customized states.

- Gantt:
  In this microservice we are using bb.gantt,bb.gantt charts,bb.gantt bars a Gantt chart is a user interface component that displays project tasks or events over a timeline, allowing users to visualize the schedule and progress of a project.

# Usage

Clone the boilerplate project repository to your local machine:
https://github.com/sourcefuse/angular-boilerplate

Install the project dependencies by running the following command in your terminal:
`npm install`

Run the project by running the following command in your terminal:
`ng serve`

# Development server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

# Build

Run `ng build` to build the project. The build artifacts will be stored in the dist/ directory. Use the `--prod` flag for a production build.

# Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
