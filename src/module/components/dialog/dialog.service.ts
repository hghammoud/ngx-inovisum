import { DialogData } from './dialog';
import { DialogComponent } from './dialog.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(private dialog: MatDialog, private _sanitizer: DomSanitizer) { }

    public open(component: any): Observable<boolean> {
        let dialogRef: MatDialogRef<any>;
        const config: MatDialogConfig = { data:  { innerContainer: component } as DialogData };
        dialogRef = this.dialog.open(DialogComponent, config);
        return dialogRef.afterClosed();
    }
}
