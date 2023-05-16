import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  InMemoryStorageService,
  LOCAL_STORAGE,
  SESSION_STORAGE,
} from 'ngx-webstorage-service';

import { APP_SESSION_STORE, APPLICATION_STORE } from './keys';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: APPLICATION_STORE, useExisting: LOCAL_STORAGE },
    { provide: APP_SESSION_STORE, useExisting: SESSION_STORAGE },
    InMemoryStorageService,
  ],
})
export class StoreModule {}
