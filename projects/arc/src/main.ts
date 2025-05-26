import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {enableProdMode} from '@angular/core';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
if (environment.production) {
  enableProdMode();
}
