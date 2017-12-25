import { DialogService } from './dialog.service';
import { DialogComponent } from './dialog.component';
import { InovisumSharedModule } from './../../inovisum.shared.module';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

@NgModule({
    imports: [
        InovisumSharedModule,
        MatDialogModule
    ],
    declarations: [
        DialogComponent
    ],
    exports: [
        DialogComponent
    ],
    providers: [
        DialogService
    ],
    entryComponents: [DialogComponent]
})
export class DialogModule { }
