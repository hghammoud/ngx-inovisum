import { Component, OnDestroy, HostBinding, HostListener, ApplicationRef, Injectable } from '@angular/core';
import {
    trigger,
    state,
    transition,
    animate,
    style
} from '@angular/animations';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ToastRef, IndividualConfig, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
    selector: '[toast-component]',
    templateUrl: 'notification.component.html',
    styleUrls: ['./notification.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('inactive', style({
                display: 'none',
                opacity: 0
            })),
            state('active', style({ opacity: 1 })),
            state('removed', style({ opacity: 0 })),
            transition('inactive => active', animate('300ms ease-in')),
            transition('active => removed', animate('300ms ease-in')),
        ]),
    ],
})
@Injectable()
export class NotificationComponent implements OnDestroy {
    public message?: string | SafeHtml | null;
    public title?: string;
    public options: IndividualConfig;
    /** width of progress bar */
    public width = -1;
    /** a combination of toast type and options.toastClass */
    @HostBinding('class') public toastClasses = '';
    /** controls animation */
    @HostBinding('@flyInOut') public state = 'inactive';
    private timeout: any;
    private intervalId: any;
    private hideTime: number;
    private sub: Subscription;
    private sub1: Subscription;

    constructor(
        protected toastrService: ToastrService,
        public toastPackage: ToastPackage,
        protected appRef: ApplicationRef,
    ) {
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.toastClasses = `${toastPackage.toastType} ${toastPackage.config.toastClass}`;
        this.sub = toastPackage.toastRef.afterActivate().subscribe(() => {
            this.activateToast();
        });
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe(() => {
            this.remove();
        });
    }
    public ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
    }
    /**
     * activates toast and sets timeout
     */
    public activateToast() {
        this.state = 'active';
        if (this.options.timeOut) {
            this.timeout = setTimeout(() => {
                this.remove();
            }, this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.intervalId = setInterval(() => this.updateProgress(), 10);
            }
        }
        if (this.options.onActivateTick) {
            this.appRef.tick();
        }
    }
    /**
     * updates progress bar width
     */
    public updateProgress() {
        if (this.width === 0 || !this.options.timeOut) {
            return;
        }
        const now = new Date().getTime();
        const remaining = this.hideTime - now;
        this.width = (remaining / this.options.timeOut) * 100;
        if (this.width <= 0) {
            this.width = 0;
        }
    }

    /**
     * tells toastrService to remove this toast after animation time
     */
    public remove() {
        if (this.state === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = 'removed';
        this.timeout = setTimeout(() =>
            this.toastrService.remove(this.toastPackage.toastId),
            300,
        );
    }
    @HostListener('click')
    public tapToast() {
        if (this.state === 'removed') {
            return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    }
    @HostListener('mouseenter')
    public stickAround() {
        if (this.state === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;

        // disable progressBar
        clearInterval(this.intervalId);
        this.width = 0;
    }
    @HostListener('mouseleave')
    public delayedHideToast() {
        if (this.options.extendedTimeOut === 0 || this.state === 'removed') {
            return;
        }
        this.timeout = setTimeout(() => this.remove(), this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = 100;
        if (this.options.progressBar) {
            this.intervalId = setInterval(() => this.updateProgress(), 10);
        }
    }
}
