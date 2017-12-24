import { InovisumComponentsModule } from './components/inovisumcomponents.module';
import { AdminModule, MaterialModule } from './';
import {
    RadioService,
    AuthJWTInterceptor,
    DelayResolver,
    JhispterHttpErrorInterceptor,
    LoginService,
    PrincipalService,
    RolesService,
    LanguageService,
    AuthGuard,
    AlertService,
    NotificationService,
    DialogService,
    ManagementService
} from './';

import {
    DENIED_ROUTES
} from './';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ObjectReducer } from './store/object.reducer';
import { Ng2Webstorage } from 'ngx-webstorage';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
// import { ClickOutsideModule } from 'ng-click-outside';

export function previousUrlReducer(state: any, action: any) {
    return ObjectReducer.reducer('previousUrl')(state, action);
}

export const API_URL = 'http://192.168.2.112:8080/';
@NgModule({
    imports: [
        // Importing material components
        MaterialModule,
        // Importing inovisum components
        InovisumComponentsModule,
        Ng2Webstorage,
        // ClickOutsideModule,
        // Importing admin components
        AdminModule,
        ToastrModule.forRoot(),
        StoreModule.forFeature('previousUrl', previousUrlReducer),
        RouterModule.forChild([...DENIED_ROUTES]),
    ],
    exports: [
        ToastrModule,
        // ClickOutsideModule,
        MaterialModule,
        InovisumComponentsModule
    ],
    declarations: [
    ],
    providers: [
        DialogService,
        AuthGuard,
        PrincipalService,
        LoginService,
        NotificationService,
        RolesService,
        ManagementService,
        DelayResolver,
        RadioService,
        AlertService,
        LanguageService,
        Title,
        { provide: HTTP_INTERCEPTORS, useClass: AuthJWTInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JhispterHttpErrorInterceptor, multi: true },
    ]
})
export class InovisumModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: InovisumModule
        };
    }
}
