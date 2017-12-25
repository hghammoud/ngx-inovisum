import { NotificationComponent } from './notification.component';
import { InovisumSharedModule } from './../../inovisum.shared.module';
import { NotificationService } from './../notification/notification.service';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        InovisumSharedModule
    ],
    declarations: [
        NotificationComponent
    ],
    providers: [
        NotificationService
    ],
    exports: [
        NotificationComponent
    ],
    entryComponents: [NotificationComponent]
})
export class NotificationModule { }
