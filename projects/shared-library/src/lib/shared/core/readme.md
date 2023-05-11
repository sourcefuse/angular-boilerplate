# Core

The CoreModule provides essential services and functionality that will be used throughout the
application. It imports various Angular and third-party modules including basic modules which we need for an application and this module also imports NgxPermissionsModule, ApiModule, LocalizationModule, StoreModule, ToasterModule etc.The module extends EnsureModuleLoadedOnce class to ensure that it is only loaded once in the application.

1. API:

# Adapters:

We are using 3 adapters in this application named `anyAdapter`,`countAdapter`,`nameAdapter`.

- `NameIdAdapter`:This class implements the IAdapter interface, which has two methods:
  adaptToModel and adaptFromModel.

  ```
  export interface IAdapter<T, R = T> {
  adaptToModel(resp: any): T;
  adaptFromModel(data: Partial<R>): any;
  }
  ```

- The `adaptToModel()` method takes an object response and returns a new NameId object constructed
  from the response object. The NameId object is a model object with two properties: name and id.

- The `adaptFromModel()` method takes an object data of type NameId as input and returns the same
  object data. This method is intended to be used for adapting data from a model object in the application to a format that can be sent to the API.

- `anyAdapter` :It is designed to be used as a generic adapter for any type of data.

- `countAdapter` :It is designed to be used specifically with Count data and adapts API responses
  to Count model objects.

# Commands:

- In this application we are using `del-api.command,get-api.command,get-list-api.command`,
  `patch-api.command,post-api.command,put-api.command` and these commands implement the ICommand interface.
- The purpose of these commands is to provide a template for creating commands that execute a
  DELETE request to an API endpoint using an apiService.Also implements the method which uses the apiService to make an GET request to the API using the uri and parameters properties and PATCH operations on a specified URI using an API service and an adapter to convert data.

- It provides a generic way to implement POST API commands that can be extended to suit
  specific needs and the commands also sends a PUT request to the server using the apiService with the specified uri and data in the request body and they return an Observable that emits the adapted response from the server.

- These serves as a base class for other classes that inherit from it and provide specific
  implementation details.

# Models

We are using 3 models named `count.model,named-id-required.model,named-id.model` In these models we are using model based validation.

# Backend filters:

It provides a set of types and interfaces for constructing complex filters for backend APIs.These include types for defining filter conditions, operators, logical AND and OR clauses, field selection, and related object inclusion.The BackendFilter interface defines a complete filter with all of its components, including where, fields, order, limit, skip, offset, and include etc.

2. Auth:

# Adaptors:

## logged-in-user-adapter.service:

- This class is adapter that provides way to adapt the API response to a `LoggedInUserDM` model representing a logged-in user.
- This class has two methods:The `adaptToModel` takes in a response object and adapts it to a `LoggedInUserDM`
  model object by mapping the properties from the response object to the corresponding properties of the model object.
- It also creates new instance of the `LoggedInUserDM` class and passes the mapped properties to
  its constructor to trigger data validations.
- The `adaptFromModel` adapts data from a LoggedInUserDM model and returns data.

## login-adapter.service:

- The `LoginAdapterService` provides two methods to convert data to and from the model representation. The `adaptFromModel` method takes an instance of LoginModel and returns an object that matches the expected format for the API request. The returned object contains the username, password, clientId, and clientSecret properties.
- The `adaptToModel` method takes an API response object and returns data. This is likely because the API response already matches the expected format for the LoginModel representation used by the application.

# Commands:

It provides commands names `forget-password.command,get-current-user.comand,get-token.command,google-login.command,logout.command,refresh-token.command,reset-password.command,verify-reset-password-link.command and login.command`.We are using these commands for authorization that makes it convenient for the user to login,logout and retrieve information.

# Guards:

In application guards are used to control access to certain routes or pages in the
application. They are essentially middleware functions that are executed before a route is activated. Guards can be used to check if the user has permission to access a certain route, if the user is logged in, or to perform other types of authentication or authorization check.
It provides two guards as follows:

1. The LoggedInGuard:
   It is used to prevent authenticated users from accessing certain routes by first getting the system configuration by calling `getEnvConfig()` method of SystemStoreFacadeService.
   Then it checks if the user is logged in or not by calling `isLoggedIn()` method of AuthService. If the user is logged in, the method sets a timeout to navigate to the home page after a certain period of time.
   If the user is not logged in, the method returns an observable that emits true, allowing the user to access the route.

2. AuthGuard:
   The AuthGuard checks whether the user is authenticated or not, by calling the `isLoggedIn()` method of the AuthService. If the user is not authenticated, the AuthGuard navigates the user to the login page and returns false, preventing the user from accessing the protected route.
   The AuthGuard also saves the last accessed URL, so that the user can be redirected back to the protected page after successful authentication. The AuthGuard also handles authorization codes sent as query parameters, by calling the `authorize()` method of the AuthService with the code and then checking if the user is authenticated.

# Models:

We are using 4 models named `logged-in-user.model,loggedin-response.model,login.model`,
`token-response.model` that represents user's data when they are logged in,response from a login API call(code),data that is required for a user to authenticate or login to a system and the the response from server after a user gets authenticated and obtains a new access token and refresh token.

3. Decorator:

We are using 2 decorators named `required.decorator` and `validate.decorator`.

- The `required` decorator is used to mark properties in a model as required and adds the
  property name to a list of required properties stored in metadata.
- The `validate` decorator is used as a class decorator to validate the property constraints of
  a parameterized constructor. The required decorator adds metadata to the target constructor and validate uses `Reflect.getMetadata` to retrieve the required properties and validate them in the constructor.
  These decorators help to ensure that required properties are not left undefined or null.

4. Interceptors:

In this application we are using 3 Interceptors named `auth.interceptor,error.interceptor,session-recovery`.interceptor.These interceptors are responsible for adding an authorization header to requests that require authentication, checks for errors that occur during HTTP requests anddisplays error messages and also refreshes the user's authentication token when the session gets expired.

- Auth Interceptor:An Angular HttpInterceptor that intercepts HTTP requests sent from the client and modifies them before they are sent to the server. The interceptor is responsible for adding an Authorization header to requests that require authentication, deleting a specific header in requests that need to skip authentication or to handle internationalization requests separately, and navigating the user to the homepage if they are not authenticated and the current route does not allow unauthenticated requests.

- Error Interceptor:The interceptor checks for errors that occur during HTTP requests and displays error messages to the user using an injected toaster service.

- Session Interceptor:This interceptor is to refresh the user's authentication token when it has expired or has been revoked, so that the user can continue to access protected resources without having to log in again.Once the token has been refreshed, it updates the request header with the new token and sends the request again.

5. Localization:

In this application we are using `i18n` module as a language translator & where we are using 3 files as follows :

- Enums:we are using `language.enum` in this application where this files define the set of named values.
- Module:We are using `localization.module` while using the module we are using data from enum too
  and according to enums value we translate the language and call the service
- Service: The translationService provides localization functionality to the application. It depends on  
  `@ngx-translate/core` library to handle translations allowing users to select their preferred language for
  the application & to provide appropriate translations based on that preference.

6. Env Resolver Service:

- The purpose of this service is to retrieve environment configuration data from store(SystemStoreFacadeService) and make it available to components before they are displayed.

- The `resolve()` method is called by the router before a component is activated and returns an observable of the environment configuration data ensuring that the observable completes after a single emission, and checks if the retrieved data exists. If it does, it is returned, and if not, an error message is logged using NGXLogger and the default environment configuration object is returned.

7. Store:

# Adapters:

- EnvAdapterService provides methods for adapting data to and from a specific data model. In this case, the data
  model is the environment object that contains configuration data for the application.
- The `adaptToModel()` method takes an input response and returns a new object of type typeof environment. It
  converts the logLevel property of the input object to a numeric value and assigns it to `NgxLoggerLevel.ERROR` if the logLevel property is not defined or is not a number. It then returns a new object that combines the original environment object and the adapted resp object.
- The `adaptFromModel()` method takes a partial data of type typeof environment and returns an object.

# Commands:

The `GetEnvCommand` extends the `GetAPICommand` class and encapsulates the logic of making a GET request to retrieve configuration data for the application from a JSON file and adapting it to a specific data model using the provided IAdapter implementation.

# Services:

## SystemStoreFacadeService:

- It is used to fetch and update environment configurations.
  The `getEnvConfig()` method of this service is used to retrieve the environment configurations.The method returns a clone of the stored configurations if the configurations are already available in an in-memory storage.
- If not, the method sends a GET request to the server using an instance of the GetEnvCommand
  class. This class is responsible for retrieving the environment configurations from the server and adapting them to the required format using the ApiService and EnvAdapterService.
- It also updates the environment configurations in memory and logs the change in the logging
  system.

## `UserSessionStoreService`:

- It provides methods to save, retrieve, and remove user session data such as access token, refresh token,
  user information, and last accessed URL

8. Toaster

- In this application we are using toaster named Itoaster this is a user interface component that displays
  notifications or alerts to users in a non-intrusive way. Itoaster notifications typically appear as small pop-up messages that provide feedback or information.

- In order to use it ,one can incorporate `ToasterService` [here]() provided in theme module which provides  
  methods to display toast messages using the NbToastrService from the `@nebular/theme package`. The service has methods to show different types of toast messages such as success, info, warning, error, and default, and allows customization of the toast messages through an optional config parameter. The `ToasterAdapterService` is used to adapt the config object to the format expected by the NbToastrService. The service implements the IToaster interface which defines the method signatures for displaying toast messages.

9. Component Base Directive:

- `ComponentBaseDirective`, which is intended to be used as a base class for other components. The directive
  implements the `OnDestroy()` lifecycle hook, which allows for the clean-up of resources when the component is destroyed which in turn calls the `clearAllSubscriptions()` method to unsubscribe and release all resources that the component has acquired during its lifetime.

- The directive also includes a `blurActiveElement()` method that can be used to remove focus from the currently
  active element on the page when the component is destroyed or otherwise becomes inactive. The method checks if the currently focused element is a HTMLButtonElement and calls the blur method to remove focus if it is.

10. Route-Component-Base

- The RouteComponentBaseDirective class is used as a base class in Angular components that have routing
  functionality. It provides several methods for retrieving and observing route parameters and query parameters, as well as methods for navigating back and to the home page.
