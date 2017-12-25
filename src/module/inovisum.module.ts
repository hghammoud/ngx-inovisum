import { DelayResolver } from './router/delay.resolver';
import { ManagementService } from './services/management.service';
import { RolesService } from './services/roles.service';
import { LanguageModule } from './components/language-picker/language.module';
import { RadioService } from './services/radio.service';
import { AuthGuard } from './services/auth-guard.service';
import { PrincipalService } from './services/principal.service';
import { LoginService } from './services/login.service';
import { DialogModule, DialogService } from './components/dialog';
import { InovisumSharedModule } from './inovisum.shared.module';
import { FrameworkNoContentModule } from './components/framework-no-content/framework-no-content.module';
import { FrameworkBodyModule } from './components/framework-body/framework-body.module';
import { FrameworkDeniedModule } from './components/framework-denied/framework-denied.module';
import { JhispterHttpErrorInterceptor } from './interceptors/jhispter-http-error.interceptor';
import { AuthJWTInterceptor } from './interceptors/auth-jwt.interceptor';
import { AdminModule } from './admin/admin.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ObjectReducer } from './store/object.reducer';
import { Ng2Webstorage } from 'ngx-webstorage';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';
// import { ClickOutsideModule } from 'ng-click-outside';

export function previousUrlReducer(state: any, action: any) {
    return ObjectReducer.reducer('previousUrl')(state, action);
}

@NgModule({
    imports: [
        Ng2Webstorage,
        AdminModule,
        InovisumSharedModule,
        FrameworkDeniedModule,
        FrameworkBodyModule,
        FrameworkNoContentModule,
        LanguageModule,
        DialogModule,
        StoreModule.forFeature('previousUrl', previousUrlReducer),
    ],
    exports: [
        InovisumSharedModule,
        FrameworkBodyModule,
        LanguageModule
    ],
    declarations: [
    ],
    providers: [
        DialogService,
        AuthGuard,
        PrincipalService,
        LoginService,
        RolesService,
        ManagementService,
        DelayResolver,
        RadioService,
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
