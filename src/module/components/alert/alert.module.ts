import { NotificationModule } from './../notification/notification.module';
import { InovisumSharedModule } from './../../inovisum.shared.module';
import { RadioService } from './../../services/radio.service';
import { NotificationService } from './../notification/notification.service';
import { AlertService } from './alert.service';
import { AlertListenerComponent } from './alert-listener.component';
import { AlertComponent } from './alert.component';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        InovisumSharedModule,
        NotificationModule
    ],
    declarations: [
        AlertComponent,
        AlertListenerComponent
    ],
    providers: [
        RadioService,
        AlertService,
        NotificationService
    ],
    exports: [
        AlertComponent,
        AlertListenerComponent
    ]
})
export class AlertModule { }
