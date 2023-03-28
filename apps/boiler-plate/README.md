<!-- # AngularBoilerPlate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. -->

<!-- DOCUMENTATION -->

# Angular-BoilerPlate

# Overview

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

loginComponent The login component uses the authentication service to login to the application. If the user is already logged in they are automatically redirected to the home page.

homeComponent The home page shows the content what is exactly going into the project

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
