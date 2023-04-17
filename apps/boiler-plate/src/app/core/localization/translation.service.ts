import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {map, Observable, of} from 'rxjs';

import {LanguageTranslation} from './language.enum';
import {LocalizationModule} from './localization.module';

const enum LanguagePreferences {
  UserPreference,
  TenantPreference,
  EnvPreference,
  BrowserPreference,
}

@Injectable({
  providedIn: LocalizationModule,
})
export class TranslationService {
  constructor(public translate: TranslateService) {}

  public userPreference: LanguageTranslation | undefined;

  public tenantPreference: LanguageTranslation | undefined;

  public envPreference: LanguageTranslation | undefined;

  public browserPreference: LanguageTranslation | undefined;

  /*
  `prefPriority` is an array that defines the order of priority for language preferences.
  */
  protected prefPriority = [
    LanguagePreferences.UserPreference,
    LanguagePreferences.TenantPreference,
    LanguagePreferences.EnvPreference,
    LanguagePreferences.BrowserPreference,
  ];

  init(langs: LanguageTranslation[] = [LanguageTranslation.ENGLISH]) {
    this.translate.addLangs(langs);

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(LanguageTranslation.ENGLISH);

    this.browserPreference = navigator.language as LanguageTranslation;
  }
  /*
  This function resets the current language of the translation service to a new language 
  based on a set of language preferences.
  */
  reset(): Observable<string> {
    let langToSet: LanguageTranslation | undefined;
    for (let i = 0; i < this.prefPriority.length; i++) {
      if (
        this.prefPriority[i] === LanguagePreferences.UserPreference &&
        this.userPreference
      ) {
        langToSet = this.userPreference;
        break;
      } else if (
        this.prefPriority[i] === LanguagePreferences.TenantPreference &&
        this.tenantPreference
      ) {
        langToSet = this.tenantPreference;
        break;
      } else if (
        this.prefPriority[i] === LanguagePreferences.EnvPreference &&
        this.envPreference
      ) {
        langToSet = this.envPreference;
        break;
      } else if (
        this.prefPriority[i] === LanguagePreferences.BrowserPreference &&
        this.browserPreference
      ) {
        langToSet = this.browserPreference;
        break;
      } else {
        // Unmatched preference
        continue;
      }
    }
    /* It checks if a language preference has been set and if not, it returns the
    current language being used by the translate service.
    */
    if (!langToSet) {
      return of(this.translate.currentLang);
    }
    // get the available languages
    const languages = this.translate.getLangs();
    for (const lang of languages) {
      if (langToSet.includes(lang)) {
        return this.translate
          .use(lang)
          .pipe(map(() => this.translate.currentLang));
      }
    }
    // If the preferred language is not available, it returns the current language being used
    return of(this.translate.currentLang);
  }
}
