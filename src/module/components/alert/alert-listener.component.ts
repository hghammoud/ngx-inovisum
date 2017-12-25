import { RadioService } from './../../services/radio.service';
import { NotificationService } from './../notification/notification.service';
import { AlertService, AlertMessage } from './alert.service';
import { AlertComponent } from './alert.component';
import { InoComponent } from './../ino.component';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { Component, Input, OnInit, Injectable, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

/**
 * This component is used to add an alert listener in a page or component
 * that subscribes to a specific alert prefix. It will then render the received alerts.
 *
 * Properties:
 *
 * | Type | API |
 * | --- | --- |
 * | completed | displayCompleted |
 * | all | displayAll |
 * | remaining | displayRemaining |
 *
 * Example:
 *
 * ```html
 * <ino-alert-listener [prefix]="http" [isToast]="true"></ino-alert-listener>
 * ```
 */
@Component({
    selector: 'ino-alert-listener',
    templateUrl: './alert-listener.component.html',
})
@Injectable()
export class AlertListenerComponent extends InoComponent implements OnInit {
    /** Used to select the events to listen to. */
    @Input() public prefix: string;
    /** Will define if the alert message will be displayed as inline or as a toast notification. */
    @Input() public isToast = false;
    public alerts: AlertMessage[] = [];
    constructor(
        private radio: RadioService,
        private alertService: AlertService,
        private notificationService: NotificationService) {
        super();
    }

    public ngOnInit() {
        this.addSubscription(
            this.radio.on(this.prefix).subscribe((event) => {
                if (this.isToast) {
                    switch (event.type) {
                        case 'error':
                            this.notificationService.error({ message: event.message, title: event.title });
                            break;
                        case 'alert':
                            this.notificationService.warning({ message: event.message, title: event.title });
                            break;
                    }
                } else {
                    console.log(event);
                    switch (event.type) {
                        case 'error':
                            this.alertService.error(this.prefix, event.message, event.title);
                            break;
                        case 'alert':
                            this.alertService.warning(this.prefix, event.message, event.title);
                            break;
                    }
                }
            })
        );
        this.addSubscription(
            this.alertService.getAlerts(this.prefix).subscribe((_alerts: any) => {
                this.alerts = _alerts;
            })
        );
    }

    public remove(alert: AlertMessage) {
        this.alertService.removeAlert(alert, this.prefix);
    }
}
