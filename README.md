# Sourceloop Angular Multi Project Application

<!-- DOCUMENTATION -->

# Description

- We are using multiple projects in one Angular environment so that we can help users to improve 
  code  reusability, scalability, maintainability, and customization. It can also help in increase productivity, reduce risks, and improve the quality of  application.

- Code Reusability: I have multiple applications or parts of applications that share common functionality, 
  using multiple projects can help you avoid duplicating code. You can create a shared library project and use it across all the projects. This approach can help you maintain consistency and reduce code duplication.

- Isolation: Each project can be developed and tested independently, which allows you to isolate changes and
  minimize the risk of breaking other parts of the application. This approach can help you increase productivity and reduce the time spent on debugging and fixing issues.

- Scalability: As your application grows, it can become more complex and harder to maintain. Using multiple
  projects can help you manage complexity by breaking down the application into smaller, more manageable pieces. You can also use different teams to work on different projects, which can help you scale the development process.

- Customization: Each project can have its own configuration and dependencies, which allows to 
  customize the build process and optimize each project for its specific use case. This approach can help to improve the performance and reduce the size of the application.

# Projects

1. Angular-BoilerPlate:
- This boilerplate project is a project set up that can be easily altered to create new projects. The user 
  is able to use in the original project, its foundation, and its structure to set up a new one without changing the original.

- This project is based on Angular CLI on version 14.0.0.

FOR further reference you can refer [here]()

2. Shared Library
- A shared library can include components, services, pipes, directives, and other modules that can be used 
  by other projects in the workspace. By using a shared library, you can avoid duplicating code and functionality across multiple projects, which can save time and effort.
 
For further reference you can refer [here]()

# Prerequisite

Run `npm install -g @angular/cli` for Angular CLI & NPM installed
Run `npm i @angular/material` for Angular material

# Code scaffolding

Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.


# MainProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
