import { MatDialogRef } from '@angular/material';
export interface IDialogComponent {
    dialogRef: MatDialogRef<any>;
}

export interface DialogData {
    innerContainer: any;
    data?: any;
}
