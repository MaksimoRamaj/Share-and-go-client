import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LangServiceService {

  constructor() { }

  private translate = inject(TranslateService);

  changeLanguage(lang: string) {
    this.translate.use(lang).subscribe(() => {
      console.log('Language changed to: ' + lang);
    });
    localStorage.setItem('language', lang);
  }

  isLanguageSelectorVisible = signal(false);

  toggleLanguageSelector() {
    this.isLanguageSelectorVisible.set(!this.isLanguageSelectorVisible());
  }

}
