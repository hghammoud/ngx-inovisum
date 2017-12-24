import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { TableComponent } from './table/table.component';
import { SigninComponent } from './sign-in/sign-in.component';
import { DropdownItemComponent } from './dropdown/dropdown-item.component';
import { AlertListenerComponent } from './alert/alert-listener.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropDownTriggerDirective } from './dropdown/dropdown-trigger.directive';
import { FrameworkNoContentComponent } from './framework-no-content/framework-no-content.component';
import { FrameworkDeniedComponent } from './framework-denied/framework-denied.component';
import { FrameworkBodyComponent } from './framework-body/framework-body.component';
import { DialogComponent } from './dialog/dialog.component';
import { NotificationComponent } from './notification/notification.component';
import { LeftMenuComponent } from './leftmenu/leftmenu.component';
import { SelectComponent } from './select/select.component';
import { TagComponent } from './tag/tag.component';
import { ButtonComponent } from './button/button.component';
import { AlertComponent } from './alert/alert.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material.module';
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
