import { ButtonComponent } from './button.component';
import { InovisumSharedModule } from './../../inovisum.shared.module';
import { NgModule } from '@angular/core';
import { MatIconModule, MatButtonModule } from '@angular/material';
@NgModule({
    imports: [
        InovisumSharedModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [
        ButtonComponent
    ],
    exports: [
        ButtonComponent
    ]
})
export class ButtonModule { }
