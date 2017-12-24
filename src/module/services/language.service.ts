import { Language } from './../components/language-picker/language';
import { Injectable } from '@angular/core';
@Injectable()
export class LanguageService {
    public languages: Language[] = [{
        name: 'English', i18n: 'en', icon: 'gb'
    }, {
        name: 'Francais', i18n: 'fr', icon: 'fr'
    }];

    public getLanguages() {
        return this.languages;
    }
}
