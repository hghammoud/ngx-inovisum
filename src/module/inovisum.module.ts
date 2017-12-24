import { JhispterHttpErrorInterceptor } from './interceptors/jhispter-http-error.interceptor';
import { AuthJWTInterceptor } from './interceptors/auth-jwt.interceptor';
import { LanguageService } from './services/language.service';
import { AlertService } from './components/alert/alert.service';
import { RadioService } from './services/radio.service';
import { DelayResolver } from './router/delay.resolver';
import { LoginService } from './services/login.service';
import { ManagementService } from './services/management.service';
import { RolesService } from './services/roles.service';
import { NotificationService } from './components/notification/notification.service';
import { PrincipalService } from './services/principal.service';
import { AuthGuard } from './services/auth-guard.service';
import { DialogService } from './components/dialog/dialog.service';
import { DENIED_ROUTES } from './components/framework-denied/denied.routes';
import { AdminModule } from './admin/admin.module';
import { MaterialModule } from './material.module';
import { InovisumComponentsModule } from './components/inovisumcomponents.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
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

@NgModule({
    imports: [
        // Importing material components
        MaterialModule,
        HttpClientModule,
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
