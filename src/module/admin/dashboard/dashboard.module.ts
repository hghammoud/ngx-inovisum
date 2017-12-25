import { AdminSharedModule } from './../admin.shared.module';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        AdminSharedModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class AdminDashboardModule { }
