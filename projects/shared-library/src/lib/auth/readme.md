# Auth Module

1. Login Component:

- Login component allows users to authenticate themselves by entering their credentials, such as a username and password and also we can login with google.
- The login component typically includes a form with input fields for the user's credentials, as well as a submit button to initiate the login process also gives us option to login via google.
- The login component communicates with a backend server to verify the user's credentials and grant access to the application if the user is authorized. Upon successful authentication, the login component typically stores the user's session information, such as a token or cookie, to allow the user to access protected resources without having to login again.
- The component is a basically for an Angular login page with a Google login option
- The login component may also include features such as password reset, remember me functionality, and social login options.

2. Auth Component:

- Auth component is a module that handles the authentication and authorization of users. It is responsible for managing user sessions, verifying user credentials, and granting access to protected resources based on the user's role and permissions.
- The auth component typically includes a login as well as a registration form for new users to create an account. The component may also handle password reset functionality and provide options for users to manage their accounts
- This component defines an Angular component that extends the `NbAuthComponent` class, which is a part of the `@nebular/auth` package. This component is responsible for handling the authentication process in the Angular application. It is using dependency injection to inject the `NbAuthService` and `Location` dependencies into the component's constructor.
