import { NotificationComponent } from './notification.component';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

export interface ToastMessage {
    message?: string;
    title?: string;
    type?: string;
}

@Injectable()
export class NotificationService {
    private static DEFAULT_TIMEOUT = 5000;
    private static DEFAULT_POSITION = 'toast-top-right';

    constructor(private toastr: ToastrService) {
    }

    public success(toastMessage: ToastMessage, timeout: number = NotificationService.DEFAULT_TIMEOUT,
        position: string = NotificationService.DEFAULT_POSITION) {
        this.toastr.success(toastMessage.message, toastMessage.title,
            { timeOut: timeout, positionClass: position, closeButton: true, toastComponent: NotificationComponent });
    }
    public info(toastMessage: ToastMessage, timeout: number = NotificationService.DEFAULT_TIMEOUT,
        position: string = NotificationService.DEFAULT_POSITION) {
        this.toastr.info(toastMessage.message, toastMessage.title,
            { timeOut: timeout, positionClass: position, closeButton: true, toastComponent: NotificationComponent });
    }
    public error(toastMessage: ToastMessage, timeout: number = NotificationService.DEFAULT_TIMEOUT,
        position: string = NotificationService.DEFAULT_POSITION) {
        this.toastr.error(toastMessage.message, toastMessage.title,
            { timeOut: timeout, positionClass: position, closeButton: true, toastComponent: NotificationComponent });
    }
    public warning(toastMessage: ToastMessage, timeout: number = NotificationService.DEFAULT_TIMEOUT,
        position: string = NotificationService.DEFAULT_POSITION) {
        this.toastr.warning(toastMessage.message, toastMessage.title,
            { timeOut: timeout, positionClass: position, closeButton: true, toastComponent: NotificationComponent });
    }
}
