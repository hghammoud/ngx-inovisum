import { AdminSharedModule } from './../admin.shared.module';
import { ApiComponent } from './api.component';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        AdminSharedModule
    ],
    declarations: [
        ApiComponent
    ]
})
export class AdminApiModule { }
