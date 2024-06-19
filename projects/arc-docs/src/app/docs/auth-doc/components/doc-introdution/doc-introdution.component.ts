import {Component} from '@angular/core';

@Component({
  selector: 'app-doc-introdution',
  templateUrl: './doc-introdution.component.html',
  styleUrls: ['./doc-introdution.component.scss'],
})
export class DocIntrodutionComponent {
  strategyList: object[] = [
    {
      Data: ' AuthService: Describes how to handle login and logout with Authentication.',
    },
    {
      Data: 'AuthGuard: Explains how to protect routes based on the users authentication state.',
    },
    {
      Data: 'AppComponent: Shows how to manage user state and provide login/logout functionality in the UI.',
    },
    {
      Data: '  AppRoutingModule: Demonstrates how to configure routes and apply authentication guards.',
    },
  ];

  helpingData: object[] = [
    {
      list: `AuthService: AuthService is a service that handles all authentication-related operations
       in an Angular application using Firebase Authentication. It provides methods for logging in and signing up users 
       using various authentication strategies, managing the current users authentication state, and handling logout.`,
    },
    {
      list: `AuthGaurd: AuthGuard is a route guard in Angular that prevents unauthorized access to certain routes in your application. 
      It checks if a user is authenticated before allowing access to a route, ensuring that only 
      authenticated users can access protected routes.`,
    },
    {
      list: `SessionStoreService: SessionStoreService is an Angular service that provides a simple API for interacting with the browser's 
      session storage. It allows you to store, retrieve, and remove data that persists for the duration of the page session.`,
    },
    {
      list: `ApiService: ApiService is an Angular service that provides a simple API for interacting with a backend server. 
      It handles HTTP requests and responses, making it easy to perform CRUD (Create, Read, Update, Delete) operations.`,
    },
  ];
}
