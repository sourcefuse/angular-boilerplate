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

src/: This directory contains all the source files of your microservice.

angular.json: This file contains configuration options for your Angular project.

package.json: This file contains dependencies and scripts for your project.

tsconfig.json: This file contains TypeScript compiler options for your project.

Within the src/ directory, the recommended file structure is as follows:

app/: This directory contains the root component and other components, services, and modules for your microservice.

assets/: This directory contains static assets like images, fonts, and other files that should be copied as-is to the output folder.

environments/: This directory contains environment-specific configuration files.

index.html: This file is the entry point for your microservice.

main.ts: This file bootstraps your microservice.

styles.css: This file contains global styles for your microservice.

test.ts: This file is the entry point for your microservice's tests.

Within the app/ directory, the recommended file structure is as follows:

app.component.ts, app.component.html, and app.component.css: These files define the root component of your microservice.

app.module.ts: This file defines the main module of your microservice.

shared/: This directory contains shared components, services, and modules for your microservice.

feature/: This directory contains feature-specific components, services, and modules for your microservice.

# Project Features

authComponent: this component authenticates the user and receives an access token from Auth

loginComponent: The login component uses the authentication service to login to this microservice. If the user is already logged in they are automatically redirected to the home page.

mainModule:The Main module where the User enters after login under mainModule we have homeComponent.

homeComponent: The home page shows the content what is exactly going into the project

adapters: We are using 3 adapters in this microservice named "anyAdapter,countAdapter,nameAdapter" we use this adaters for manipulating the data, as we get the data from the api

commands:In this microservice we are using "del-api.command,get-api.command,get-list-api.command,patch-api.command,post-api.command,put-api.command" We are using all the commands for CRUD api Operations.

models::We are using 3 models named "count.model,named-id-required.model,named-id.model" In these models we are using model based validation and count model is updating whenever we get the data

decorator:In this microservice we are using 2 decorators named "required.decorator,validate.decorator",In these decorator we are providing our requirment for the data that which data needs to be fill,and than validate the data

Interceptors:In this microservice we are using 3 Interception named auth.interceptor,error.interceptor,session-recovery.interceptor so in this we are proving header as token & checking when that gives us the error and also checking when will session get experied

localization:In this microservice we are using i18n module as a language translator & where we are using 3 files as follows :

enums: we are using language.enum in this microservice where this files define the set of named values.

Module:we are using localization.module while using the module we are using data from enum too and according to enums value we translate the language and call the service

Service: we are using translate.service in this microservice,when we get the data from the module we push the data through the api over the server

toaster: In this microservice we are using toaster named Itosater this is a user interface component that displays notifications or alerts to users in a non-intrusive way. Itoaster notifications typically appear as small pop-up messages that provide feedback or information.

theme.scss: theme.scss is a file in an Angular boilerplate microservice we used this file to define the global styles and visual theme of the application. It's an important file that determines the look and feel of the application, such as the color scheme, typography, and layout.

guards: In microservice guards are used to control access to certain routes or pages in the application. They are essentially middleware functions that are executed before a route is activated. Guards can be used to check if the user has permission to access a certain route, if the user is logged in, or to perform other types of authentication or authorization check.

breadcrumb: we are using bb-breadcrumbs in our microservice which is user interface component named bb-breadcrumb.component that provides users with a navigation trail or path of the pages they have visited within an application.

gantt: In this microservice we are using bb.gantt,bb.gantt charts,bb.gantt bars a Gantt chart is a user interface component that displays project tasks or events over a timeline, allowing users to visualize the schedule and progress of a project.

grid: We are using Ag-Grid this is a powerful and flexible data grid component that can be used in Angular boilerplate microservice to display and manipulate large amounts of data.

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
