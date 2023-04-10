import {EventEmitter} from '@angular/core';
import {AnyObject} from '@boiler/core/api';

import {Observable, of} from 'rxjs';

export class AngularTranslationServiceStub {
  public onLangChange = new EventEmitter<AnyObject>();
  public onTranslationChange = new EventEmitter<AnyObject>();
  public onDefaultLangChange = new EventEmitter<AnyObject>();
  public addLangs(langs: string[]) {
    return;
  }
  public getLangs() {
    return ['en-us'];
  }
  public getBrowserLang() {
    return '';
  }
  public getBrowserCultureLang() {
    return '';
  }
  public use(lang: string) {
    return null;
  }
  // tslint:disable-next-line:no-reserved-keywords
  public get(key: string): Observable<string> {
    return of(key);
  }

  public instant() {
    return '';
  }
}

export class TranslationServiceStub {
  translate: AngularTranslationServiceStub;
  constructor() {
    this.translate = new AngularTranslationServiceStub();
  }
  init() {
    // This is intentional
  }
  reset(): Observable<string> {
    return of('');
  }
}
