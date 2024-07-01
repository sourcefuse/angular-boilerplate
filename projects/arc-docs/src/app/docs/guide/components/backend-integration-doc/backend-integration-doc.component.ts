import {Component} from '@angular/core';

@Component({
  selector: 'app-backend-integration-doc',
  templateUrl: './backend-integration-doc.component.html',
  styleUrls: ['./backend-integration-doc.component.scss'],
})
export class BackendIntegrationDocComponent {
  DataList: object[] = [
    {
      lable: 'Install LoopBack CLI if you haven’t already:',
      listData: 'npm install -g @loopback/cli',
    },
    {
      lable: 'Create a new LoopBack application:',
      listData: 'lb4 app testapp',
    },
  ];

  runServer: object[] = [
    {
      command: 'ng serve',
    },
  ];

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
}
