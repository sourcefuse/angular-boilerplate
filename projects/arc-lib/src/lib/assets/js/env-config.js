fetch(`assets/json/environment.json?t=${new Date().getTime()}`, {
  pragma: 'no-cache',
  'cache-control': 'no-cache',
})
  .then(res => res.json())
  .then(cfg => {
    if (cfg.cspApiUrl) {
      const config = {
        'script-src': `'self' 'unsafe-eval'`,
        'connect-src': `'self' ${cfg.cspApiUrl.split(',').join(' ')}`,
        'worker-src': `'self'`,
      };

      let meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = `
        default-src 'self';
        script-src ${config['script-src']} https://*.newrelic.com https://*.nr-data.net;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: https://*.amazonaws.com;
        media-src 'self' data: https://*.amazonaws.com https://public.boxcloud.com;
        connect-src ${config['connect-src']} https://*.nr-data.net data:;
        font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:;
        worker-src ${config['worker-src']};
      `;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  });
