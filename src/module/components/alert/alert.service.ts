import { Observable } from 'rxjs/Observable';
import { ToastMessage } from './../notification/notification.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

export interface AlertMessage extends ToastMessage {
    message?: string;
    title?: string;
    type?: string;
    timeout?: number;
}

@Injectable()
export class AlertService {
    private static DEFAULT_TIMEOUT = 55000;
    private alerts: AlertMessage[][] = [];
    private $alerts: Array<EventEmitter<AlertMessage[]>> = [];

    constructor(private toastr: ToastrService) {
    }

    public success(prefix: string, _message: string, _title: string, _timeout: number = AlertService.DEFAULT_TIMEOUT) {
        const alert: AlertMessage = { message: _message, title: _title, type: 'success', timeout: _timeout };
        this.pushAlert(prefix, alert);
    }
    public info(prefix: string, _message: string, _title: string, _timeout: number = AlertService.DEFAULT_TIMEOUT) {
        const alert: AlertMessage = { message: _message, title: _title, type: 'info', timeout: _timeout };
        this.pushAlert(prefix, alert);
    }
    public error(prefix: string, _message: string, _title: string, _timeout: number = AlertService.DEFAULT_TIMEOUT) {
        const alert: AlertMessage = { message: _message, title: _title, type: 'error', timeout: _timeout };
        this.pushAlert(prefix, alert);
    }
    public warning(prefix: string, _message: string, _title: string, _timeout: number = AlertService.DEFAULT_TIMEOUT) {
        const alert: AlertMessage = { message: _message, title: _title, type: 'warning', timeout: _timeout };
        this.pushAlert(prefix, alert);
    }

    public getAlerts(prefix: string = ''): EventEmitter<AlertMessage[]> {
        if (_.isNil(this.$alerts[prefix])) {
            this.$alerts[prefix] = new EventEmitter<AlertMessage[]>();
        }
        return this.$alerts[prefix];
    }

    public removeAlert(alert: AlertMessage, prefix: string = '') {
        if (!_.isNil(this.alerts[prefix])) {
            this.alerts[prefix] = _.reject(this.alerts[prefix], alert);
            this.$alerts[prefix].emit(this.alerts[prefix]);
        }
    }

    private pushAlert(prefix: string, alert: AlertMessage) {
        if (_.isNil(this.alerts[prefix])) {
            this.alerts[prefix] = [];
        }
        this.alerts[prefix].push(alert);
        if (_.isNil(this.$alerts[prefix])) {
            this.$alerts[prefix] = new EventEmitter<AlertMessage[]>();
        }
        this.$alerts[prefix].emit(this.alerts[prefix]);
    }
}
