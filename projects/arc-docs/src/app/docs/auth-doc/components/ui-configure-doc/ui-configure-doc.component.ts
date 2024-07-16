import {Component} from '@angular/core';

@Component({
  selector: 'app-ui-configure-doc',
  templateUrl: './ui-configure-doc.component.html',
  styleUrls: ['./ui-configure-doc.component.scss'],
})
export class UiConfigureDocComponent {
  loginWrapper: object[] = [
    {
      code: `<app-login></app-login>`,
    },
  ];

  signupWrapper: object[] = [
    {
      code: `<lib-signup></lib-signup>`,
    },
  ];

  forgetPwdWrapper: object[] = [
    {
      code: `<lib-forgot-password></lib-forgot-password>`,
    },
  ];

  resetPwdWrapper: object[] = [
    {
      code: `<lib-reset-password></lib-reset-password>`,
    },
  ];
}
