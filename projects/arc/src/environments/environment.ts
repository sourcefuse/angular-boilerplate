export const environment = {
  production: false,
  clientId: '',
  publicKey: '',
  homePath: '/main/home',
  baseApiUrl: '',
  authServiceUrl: '',
  userServiceUrl: '',
  logLevel: 5,
  csp: {
    defaultSrc: [true], //'self'
    scriptSrc: [true],
    styleSrc: [true, "'unsafe-inline'"], //'self' https://fonts.example.com
    imgSrc: [true],
    connectSrc: [true, 'env:baseApiUrl'],
    objectSrc: ['none'],
    baseUri: [true],
    formAction: [true],
    blockAllMixedContent: true, // block-all-mixed-content;
  },
};
