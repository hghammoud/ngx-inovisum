import { LanguageService } from './../../services/language.service';
import { DropdownComponent } from './../dropdown/dropdown.component';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './language';
import { Component, Inject, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'ino-language-picker',
    templateUrl: 'language-picker.component.html',
    styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements OnInit {
    public languages: Language[] = [];
    public selected: Language;

    constructor(private translateService: TranslateService, private languageService: LanguageService) {
        translateService.setDefaultLang('en');
        this.languages = this.languageService.getLanguages();
    }

    public ngOnInit() {
        this.selected = _.find(this.languages, { i18n: 'en' });
    }

    public changeLanguage(language: Language) {
        this.selected = language;
        this.translateService.use(language.i18n);
    }
}
