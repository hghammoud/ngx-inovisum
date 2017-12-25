import { LanguageService } from './language.service';
import { DropDownModule } from './../dropdown/dropdown.module';
import { ButtonModule } from './../button/button.module';
import { LanguagePickerComponent } from './language-picker.component';
import { InovisumSharedModule } from './../../inovisum.shared.module';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        InovisumSharedModule,
        ButtonModule,
        DropDownModule
    ],
    declarations: [
        LanguagePickerComponent
    ],
    exports: [
        LanguagePickerComponent
    ],
    providers: [
        LanguageService
    ]
})
export class LanguageModule { }
