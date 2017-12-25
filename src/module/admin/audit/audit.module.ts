import { AdminSharedModule } from './../admin.shared.module';
import { AuditComponent } from './audit.component';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        AdminSharedModule
    ],
    declarations: [
        AuditComponent
    ]
})
export class AdminAuditModule { }
