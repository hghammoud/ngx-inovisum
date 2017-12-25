import { InovisumSharedModule } from './../inovisum.shared.module';
import { AlertModule } from './../components/alert/alert.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        InovisumSharedModule,
        AlertModule
    ],
    exports: [
        InovisumSharedModule,
        AlertModule
    ]
})
export class AdminSharedModule { }
