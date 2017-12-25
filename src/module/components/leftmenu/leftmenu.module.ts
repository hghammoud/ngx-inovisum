import { LeftMenuComponent } from './leftmenu.component';
import { InovisumSharedModule } from './../../inovisum.shared.module';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        InovisumSharedModule,
    ],
    declarations: [
        LeftMenuComponent
    ],
    exports: [
        LeftMenuComponent
    ]
})
export class LeftMenuModule { }
