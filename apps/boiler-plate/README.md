<!-- DOCUMENTATION -->

# Angular-BoilerPlate

# Description

This boilerplate project is a project set up that can be easily altered to create new projects. The user is able to use in the original project, its foundation, and its structure to set up a new one without changing the original.

This project is based on Angular CLI on version 14.0.0.

# Prerequisite

Run `npm install -g @angular/cli` for Angular CLI & NPM installed
Run `npm i @angular/material` for Angular material

# Code scaffolding

Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

# Project Structure

The Angular CLI generates the initial file structure of your project. The root directory of your project should contain the following files and directories:

src/: This directory contains all the source files of your application.

angular.json: This file contains configuration options for your Angular project.

package.json: This file contains dependencies and scripts for your project.

tsconfig.json: This file contains TypeScript compiler options for your project.

Within the src/ directory, the recommended file structure is as follows:

app/: This directory contains the root component and other components, services, and modules for your application.

assets/: This directory contains static assets like images, fonts, and other files that should be copied as-is to the output folder.

environments/: This directory contains environment-specific configuration files.

index.html: This file is the entry point for your application.

main.ts: This file bootstraps your application.

styles.css: This file contains global styles for your application.

test.ts: This file is the entry point for your application's tests.

Within the app/ directory, the recommended file structure is as follows:

app.component.ts, app.component.html, and app.component.css: These files define the root component of your application.

app.module.ts: This file defines the main module of your application.

shared/: This directory contains shared components, services, and modules for your application.

feature/: This directory contains feature-specific components, services, and modules for your application.

# Project Features

authComponent: this component authenticates the user and receives an access token from Auth

commands:In the project we using forget-password,get-current-user,get-token,google-login,login,logout,refresh-token,reset-password,verify-reset-password commands to make the autheticated and secure appication

loginComponent: The login component uses the authentication service to login to the application. If the user is already logged in they are automatically redirected to the home page.

mainModule:The Main module where the User enters after login under mainModule we have homeComponent.

homeComponent: The home page shows the content what is exactly going into the project

adapters: In the Project adapter is a library or package that allows Angular to work with other external libraries or frameworks. Adapters help to bridge the gap between Angular and these external tools, making it easier to integrate them into an project.In project we are using logged-in-user-adapter,login-adapter

decorator:In this Project decorator is a TypeScript feature used to modify or extend the behavior of a class, method, property, or parameter. Decorators in Angular are typically used to add metadata to classes or their members, which is then used by Angular's dependency injection system, routing, or other Angular features.

Interceptors:In this project, an interceptor is a TypeScript class that can intercept HTTP requests or responses before they are sent or received by an Angular application. Interceptors are commonly used to add headers, modify requests or responses, or handle errors in a consistent way across an application.

Service:In this project service is a TypeScript class that provides functionality that can be shared across components, directives, or other services in an application. Services are used to encapsulate logic that is not specific to a particular component or view.

models:In this project model is a TypeScript class that represents the data structure of an object in an application. Models are used to define the shape and properties of data that is used throughout an application.

localization: In the project localization refers to the process of adapting the user interface (UI) of the application to different languages and cultures. This allows users who speak different languages and live in different regions to use the application with ease.

enums: In the project an enum (short for enumeration) is a TypeScript construct that defines a set of named values. Enums are used to represent a fixed set of options or values that are used in an application

toaster:In project, a toaster is a user interface component that displays notifications or alerts to users in a non-intrusive way. Toaster notifications typically appear as small pop-up messages that provide feedback or information to users about actions they have taken or events that have occurred in an application

theme: In the project theme is a set of predefined styles and variables that can be applied to the user interface (UI) of the application. A theme can define things like colors, fonts, spacing, and other visual properties that give the UI a consistent look and feel.

theme.scss: theme.scss is a file in an Angular boilerplate project that is used to define the global styles and visual theme of the application. It's an important file that determines the look and feel of the application, such as the color scheme, typography, and layout.

guards: In our project guards are used to control access to certain routes or pages in the application. They are essentially middleware functions that are executed before a route is activated. Guards can be used to check if the user has permission to access a certain route, if the user is logged in, or to perform other types of authentication or authorization check.

env-resolver: In project, an env-resolver is a service that is used to dynamically load environment variables from an external configuration file. This allows developers to define different configurations for different environments (such as development, staging, and production) and to switch between them easily.

breadcrumb: In project , breadcrumbs are a user interface component that provides users with a navigation trail or path of the pages they have visited within an application. Breadcrumbs are typically displayed at the top of a page or section, and show a series of links or labels that represent the hierarchical structure of the application's pages or content.

gantt: In project, a Gantt chart is a user interface component that displays project tasks or events over a timeline, allowing users to visualize the schedule and progress of a project.

grid: We are Using Ag-grid In Our project, Ag-Grid is a powerful and flexible data grid component that can be used in Angular boilerplate projects to display and manipulate large amounts of data.

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
