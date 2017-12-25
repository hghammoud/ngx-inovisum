import { ToastrModule } from 'ngx-toastr';
import { LoadingModule } from 'ngx-loading';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        LoadingModule.forRoot({
            backdropBackgroundColour: 'rgba(255,255,255,0.6)',
            primaryColour: 'rgba(0,0,0,0.5)',
            secondaryColour: 'rgba(0,0,0,0.3)',
            tertiaryColour: 'rgba(0,0,0,0.1)'
        }),
        ToastrModule.forRoot(),
    ],
    exports: [
        CommonModule,
        FlexLayoutModule,
        HttpClientModule,
        TranslateModule,
        LoadingModule,
        ToastrModule
    ]
})
export class InovisumSharedModule { }
