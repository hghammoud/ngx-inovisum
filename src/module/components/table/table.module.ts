import { FormsModule } from '@angular/forms';
import { TableComponent } from './table.component';
import { InovisumSharedModule } from './../../inovisum.shared.module';
import { NgModule } from '@angular/core';
import { MatIconModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
@NgModule({
    imports: [
        InovisumSharedModule,
        FormsModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [
        TableComponent
    ],
    exports: [
        TableComponent
    ]
})
export class TableModule { }
