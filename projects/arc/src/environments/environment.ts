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
    defaultSrc: ["'self'"], //'self'
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"], //'self' https://fonts.example.com
    imgSrc: ["'self'"],
    connectSrc: ["'self'", 'env:baseApiUrl'],
    objectSrc: ['none'],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    blockAllMixedContent: true, // block-all-mixed-content;
  },
};
