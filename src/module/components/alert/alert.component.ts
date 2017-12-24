import { AlertMessage } from './alert.service';
import { InoComponent } from './../ino.component';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'ino-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
    @Input() public message: string;
    @Input() public title: string;
    @Input() public type: string;
    @Input() public timeout: number;
    @Input() public removable = false;
    @Output() public onRemove: EventEmitter<AlertMessage> = new EventEmitter();

    private alertMessage: AlertMessage;

    public ngOnInit() {
        this.alertMessage = { message: this.message, title: this.title, type: this.type, timeout: this.timeout };
        setTimeout(() => this.remove(), this.timeout);
    }

    public remove() {
        this.onRemove.emit(this.alertMessage);
    }
}
