import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';

import { LanguageTranslation } from './language.enum';
import { LocalizationModule } from './localization.module';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let languages = [
    LanguageTranslation.ENGLISH,
    LanguageTranslation.SPANISH,
    LanguageTranslation.JAPANESE,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LocalizationModule],
    });
    service = TestBed.inject(TranslationService);
    service.init(languages);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#init should add all languages needed by default', () => {
    const langs = service.translate.getLangs();
    expect(langs).toEqual(languages);
  });

  it('#init should set English as fallback language', () => {
    const langDefault = service.translate.getDefaultLang();
    expect(langDefault).toEqual(LanguageTranslation.ENGLISH);
  });

  it('#init should set browserPreference as per browser language', () => {
    expect(service.browserPreference as string).toEqual(navigator.language);
  });

  it('should set current language as per user preference if provided', (done) => {
    service.userPreference = LanguageTranslation.SPANISH;
    service
      .reset()
      .pipe(take(1))
      .subscribe((langSet) => {
        const currentLang = service.translate.currentLang;
        expect(currentLang).toEqual(LanguageTranslation.SPANISH);
        expect(langSet).toEqual(LanguageTranslation.SPANISH);
        done();
      });
  });

  it('should set current language as per user preference even if tenant preference is different', (done) => {
    service.userPreference = LanguageTranslation.SPANISH;
    service.tenantPreference = LanguageTranslation.JAPANESE;
    service
      .reset()
      .pipe(take(1))
      .subscribe((langSet) => {
        const currentLang = service.translate.currentLang;
        expect(currentLang).toEqual(LanguageTranslation.SPANISH);
        expect(langSet).toEqual(LanguageTranslation.SPANISH);
        done();
      });
  });

  it('should set current language as per tenant preference if user preference not provided', (done) => {
    service.userPreference = undefined;
    service.tenantPreference = LanguageTranslation.SPANISH;
    service
      .reset()
      .pipe(take(1))
      .subscribe((langSet) => {
        const currentLang = service.translate.currentLang;
        expect(currentLang).toEqual(LanguageTranslation.SPANISH);
        expect(langSet).toEqual(LanguageTranslation.SPANISH);
        done();
      });
  });

  it('should set current language as per tenant preference if user preference not provided and env preference is provided', (done) => {
    service.userPreference = undefined;
    service.tenantPreference = LanguageTranslation.SPANISH;
    service.envPreference = LanguageTranslation.JAPANESE;
    service
      .reset()
      .pipe(take(1))
      .subscribe((langSet) => {
        const currentLang = service.translate.currentLang;
        expect(currentLang).toEqual(LanguageTranslation.SPANISH);
        expect(langSet).toEqual(LanguageTranslation.SPANISH);
        done();
      });
  });

  it('should set current language as per env preference if user & tenant preference not provided', (done) => {
    service.userPreference = undefined;
    service.tenantPreference = undefined;
    service.envPreference = LanguageTranslation.JAPANESE;
    service
      .reset()
      .pipe(take(1))
      .subscribe((langSet) => {
        const currentLang = service.translate.currentLang;
        expect(currentLang).toEqual(LanguageTranslation.JAPANESE);
        expect(langSet).toEqual(LanguageTranslation.JAPANESE);
        done();
      });
  });

  it('should fallback to browser preference if no other preference is provided', (done) => {
    service.userPreference = undefined;
    service.tenantPreference = undefined;
    service.envPreference = undefined;
    service
      .reset()
      .pipe(take(1))
      .subscribe((langSet) => {
        const currentLang = service.translate.currentLang;
        expect(currentLang).toEqual(LanguageTranslation.ENGLISH);
        expect(langSet).toEqual(LanguageTranslation.ENGLISH);
        done();
      });
  });
});
