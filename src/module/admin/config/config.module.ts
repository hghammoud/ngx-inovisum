import { AdminSharedModule } from './../admin.shared.module';
import { ConfigComponent } from './config.component';
import { NgModule } from '@angular/core';
import {
    MatInputModule,
    MatExpansionModule,
    MatFormFieldModule
} from '@angular/material';

@NgModule({
    imports: [
        AdminSharedModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [
        ConfigComponent
    ]
})
export class AdminConfigModule { }
