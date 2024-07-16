import {Component} from '@angular/core';

@Component({
  selector: 'app-api-configure-doc',
  templateUrl: './api-configure-doc.component.html',
  styleUrls: ['./api-configure-doc.component.scss'],
})
export class ApiConfigureDocComponent {
  envVariables: object[] = [
    {
      command: `export const environment = {
        production: false,
        clientId: '',
        publicKey: '',
        homePath: '/main/home',
        baseApiUrl: '',
        authServiceUrl: '',
        userServiceUrl: '',
        logLevel: 5,
      };
      `,
    },
  ];

  baseEndPoints: object[] = [
    {
      command: `baseEndpoint: '(yourDomainName)/(authServiceUrl)/(endpoint)',
      login: {
        endpoint: '/auth/login',
      },
      register: {
        endpoint: '/auth/sign-up',
      },`,
    },
  ];
}
