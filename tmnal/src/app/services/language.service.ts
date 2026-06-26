import { Injectable, signal } from '@angular/core';
import { Lang, Translations, TRANSLATIONS } from '../i18n/translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _lang = signal<Lang>('en');
  readonly lang = this._lang.asReadonly();

  get t(): Translations {
    return TRANSLATIONS[this._lang()];
  }

  set(lang: Lang): void {
    this._lang.set(lang);
  }
}
