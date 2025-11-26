# [ARC Angular](https://github.com/sourcefuse/angular-boilerplate)
[![Version](https://img.shields.io/badge/@angular/core-v14-brightgreen)](https://www.npmjs.com/package/@angular/cli/v/14.0.0)


<!-- DOCUMENTATION -->

## Description

  This boilerplate uses multiple projects in single Angular workspace, which helps the users to develop shareable libraries, and for enterprises to use a "monorepo" development style, with a single repository and global configuration for all Angular projects. This boilerplate can also help in increasing productivity, reduce risks, and improve the quality of application.Duplication and redundant code can be avoided by using boilerplate approach.

## Usage

### Step 1: Clone the boilerplate project repository to your local machine

```sh
git clone https://github.com/sourcefuse/angular-boilerplate
```

### Step 2: Install the project dependencies by running the following command 

```sh
npm install 
```

After this, it will take a few minutes to set everything up, once that is done, you will see a folder structure generated like the following:-

```
BOILER-PLATE
├── .github
├── .husky
├── e2e
├── projects
├── .czferc.js
├── .npmrc
├── .cz-config.js
├── .gitignore
├── commitlint.config.js
├── CODE_OF_CONDUCT.md
├── package-lock.json
├── package.json
├── PLAYWRIGHT.md
├── README.md
└── tsconfig.json
```
Some predefined settings are initialised:-

1. A GitHub PR template is created inside: `.github`
2. Conventional commits are enabled using commitizen (`.cz-config.js`), commitlint (`commitlint-config.js`) 
   and husky for githooks.
3. `.gitignore` for ignoring files from source code. Important for secure coding and keeping the repo clean 
    on SCM (git)
4. `package.json` and `package-lock.json` for npm to work.
5. The folder named `projects`: Projects will hold the multi application pattern and will always be 
   completely independent.
6. The folder named `e2e`: Contains Playwright end-to-end tests organized by project (arc-docs, arc, saas-ui),
   each with dedicated configurations and isolated test suites.

#### Projects

##### Structure
```
PROJECTS
├── arc
├── arc-lib
│   └── src
│          └──lib
│            ├── assets
│            ├── components
│            ├── core
│            └── theme
├── (...other files)
```
##### Purpose 
  - As stated above, the boilerplate uses Multi-projects pattern to avoid duplication and is easy to maintain.
    Here Boilerplate use "Projects" folder, which serves as a centralized location to organize and store project-related files and resources. For example:- An application can have multiple user portal :- admin-portal and super-admin-portal. In that case, the structure of the "Projects" folder can look like the following:-
    ```
    PROJECTS
    ├── admin-portal
    ├── super-admin-portal
    ├── shared-lib
    │   └── src
    │          └──lib
    │            ├── assets
    │            ├── components
    │            ├── core
    │            └── theme
    ├── (...other files)
    ```

  - Boilerplate allows users to Generate new applications at same workspace by using the following command:
 ```sh
   ng generate application <application-name>
  ```

  1. Arc:
  - This refers to the different applications inside single workspace sharing code.

  2. Arc-Lib
  - This refers to the shared library which can include components, services, pipes, directives, and other modules that are shared among the applications in the workspace. By using a shared library, we avoid duplicating and using redundant code across, which can save time and effort.
 
For further reference you can refer [Here](projects/arc-lib/README.md)

### Step 3: Setup the application to run

- By default, boilerplate refers to `arc` as a `defaultProject` in the `angular.json`. One can modify it according to the project requirements.

```typescript
"defaultProject": "arc",
```

### Step 4: Running Server

```sh
ng serve
```

You'll see a message saying Server is running at `http://localhost:4200/` Navigate to this URL. The application will automatically reload if you change any of the source files.

##  Build the Application

 To build the project, run the following command:-
 
```sh
ng build
```
 The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

This boilerplate includes Playwright for E2E testing with project-specific test suites:

```sh
# Run tests for a specific project
npm run e2e:arc-docs    # Test arc-docs project (port 4200)
npm run e2e:arc         # Test arc project (port 4201)
npm run e2e:saas-ui     # Test saas-ui project (port 4202)

# Run all project tests sequentially
npm run e2e:all

# Run tests in UI mode for interactive debugging
npm run e2e:ui:arc-docs
npm run e2e:ui:arc
npm run e2e:ui:saas-ui

# Run tests in headed mode (visible browser)
npm run e2e:headed
```

For detailed information about the Playwright setup, test organization, and advanced usage, see [PLAYWRIGHT.md](PLAYWRIGHT.md).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## References
1. https://angular.io/guide/file-structure
