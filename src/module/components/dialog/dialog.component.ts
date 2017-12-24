import { DialogData } from './dialog';
import { Component, OnInit, Inject, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'ino-dialog',
    templateUrl: 'dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
    @ViewChild('container', { read: ViewContainerRef }) public viewContainer: ViewContainerRef;

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private r: ComponentFactoryResolver) { }

    public ngOnInit() {
        const factory = this.r.resolveComponentFactory(this.data.innerContainer);
        const component: any = this.viewContainer.createComponent(factory);
        component.instance.dialogRef = this.dialogRef;
    }
}
