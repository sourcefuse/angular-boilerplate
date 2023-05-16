import { Inject, Injectable } from '@angular/core';
import { InMemoryStorageService, StorageService } from 'ngx-webstorage-service';

import { LoggedInUserDM } from '../auth/models';
import { APPLICATION_STORE, APP_SESSION_STORE } from './keys';
import { StoreKeys } from './store-keys.enum';
import { StoreModule } from './store.module';

@Injectable({
  providedIn: StoreModule,
})
export class UserSessionStoreService {
  constructor(
    @Inject(APPLICATION_STORE) private readonly store: StorageService,
    @Inject(APP_SESSION_STORE) private readonly sessionStore: StorageService,

    private readonly inMemoryStore: InMemoryStorageService
  ) {}

  public saveAccessToken(token: string): boolean {
    this.store.set(StoreKeys.ACCESS_TOKEN_KEY, token);
    return true;
  }

  public getAccessToken(): string {
    return this.store.get(StoreKeys.ACCESS_TOKEN_KEY);
  }

  public removeAccessToken(): boolean {
    this.store.remove(StoreKeys.ACCESS_TOKEN_KEY);
    return true;
  }

  public saveRefreshToken(token: string): boolean {
    this.store.set(StoreKeys.REFRESH_TOKEN_KEY, token);
    return true;
  }

  public getRefreshToken(): string {
    return this.store.get(StoreKeys.REFRESH_TOKEN_KEY);
  }

  public removeRefreshToken(): boolean {
    this.store.remove(StoreKeys.REFRESH_TOKEN_KEY);
    return true;
  }

  public saveTokenExpiry(expires: number): boolean {
    this.store.set(StoreKeys.TOKEN_EXPIRY, expires);
    return true;
  }

  public getTokenExpiry(): number {
    return this.store.get(StoreKeys.TOKEN_EXPIRY);
  }

  public setUser(user: LoggedInUserDM): void {
    this.inMemoryStore.set(StoreKeys.USER_KEY, user);
  }

  public getUser(): LoggedInUserDM {
    return new LoggedInUserDM(this.inMemoryStore.get(StoreKeys.USER_KEY));
  }

  public saveLastAccessedUrl(url: string): void {
    this.sessionStore.set(StoreKeys.LAST_ACCESSED_URL, url);
  }

  public getLastAccessedUrl(): string {
    return this.sessionStore.get(StoreKeys.LAST_ACCESSED_URL);
  }

  public clearAll(): void {
    this.sessionStore.remove(StoreKeys.LAST_ACCESSED_URL);
    this.store.remove(StoreKeys.USER_KEY);
    this.store.remove(StoreKeys.ACCESS_TOKEN_KEY);
    this.store.remove(StoreKeys.REFRESH_TOKEN_KEY);
  }
}
