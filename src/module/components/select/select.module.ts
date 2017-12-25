import { SelectComponent } from './select.component';
import { InovisumSharedModule } from './../../inovisum.shared.module';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule, MatFormFieldModule, MatOptionModule, MatButtonModule, MatSelectModule } from '@angular/material';
@NgModule({
    imports: [
        InovisumSharedModule,
        OverlayModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatOptionModule
    ],
    declarations: [
        SelectComponent
    ],
    exports: [
        SelectComponent,
        MatOptionModule,
        MatSelectModule
    ]
})
export class SelectModule { }
