import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material.module';
import {
    AlertComponent,
    AlertListenerComponent,
    AlertService,
    ButtonComponent,
    TagComponent,
    DropdownComponent,
    DropdownItemComponent,
    SelectComponent,
    LeftMenuComponent,
    NotificationComponent,
    NotificationService,
    SigninComponent,
    DialogComponent,
    DialogService,
    FrameworkBodyComponent,
    FrameworkDeniedComponent,
    FrameworkNoContentComponent,
    TableComponent,
    LanguagePickerComponent,
    DropDownTriggerDirective,
} from './';
import { NgModule } from '@angular/core';
import { LoadingModule } from 'ngx-loading';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        // Used to allow material components inside components
        MaterialModule,
        // Used to allow loading inside components
        LoadingModule.forRoot({
            backdropBackgroundColour: 'rgba(255,255,255,0.6)',
            primaryColour: 'rgba(0,0,0,0.5)',
            secondaryColour: 'rgba(0,0,0,0.3)',
            tertiaryColour: 'rgba(0,0,0,0.1)'
        }),
        // Used to allow translate pipe inside components
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        // Used to allow <router-outlet> inside components
        RouterModule
    ],
    exports: [
        MaterialModule,
        LoadingModule,
        TranslateModule,
        RouterModule,
        AlertComponent,
        AlertListenerComponent,
        ButtonComponent,
        TagComponent,
        DropdownComponent,
        DropdownItemComponent,
        SelectComponent,
        LeftMenuComponent,
        NotificationComponent,
        SigninComponent,
        DialogComponent,
        FrameworkBodyComponent,
        FrameworkDeniedComponent,
        FrameworkNoContentComponent,
        TableComponent,
        LanguagePickerComponent,
        DropDownTriggerDirective
    ],
    declarations: [
        AlertComponent,
        AlertListenerComponent,
        ButtonComponent,
        TagComponent,
        DropdownComponent,
        DropdownItemComponent,
        SelectComponent,
        LeftMenuComponent,
        NotificationComponent,
        SigninComponent,
        DialogComponent,
        FrameworkBodyComponent,
        FrameworkDeniedComponent,
        FrameworkNoContentComponent,
        TableComponent,
        LanguagePickerComponent,
        DropDownTriggerDirective
    ],
    entryComponents: [DialogComponent, SigninComponent, NotificationComponent]
})
export class InovisumComponentsModule { }
