import { HighchartsModule } from './../highcharts.module';
import { InovisumComponentsModule } from './../components/inovisumcomponents.module';
import { MaterialModule } from './../material.module';
import {
    AdminComponent,
    UsersComponent,
    DashboardComponent,
    AuditComponent,
    ConfigComponent,
    ApiComponent,
    MetricsComponent
} from './';

import {
    ADMIN_ROUTES
} from './';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MaterialModule,
        HighchartsModule,
        InovisumComponentsModule,
        RouterModule.forChild([...ADMIN_ROUTES])
    ],
    exports: [
        MaterialModule,
        HighchartsModule,
        InovisumComponentsModule,
        AdminComponent,
        AuditComponent,
        MetricsComponent,
        ApiComponent,
        ConfigComponent,
        UsersComponent,
        DashboardComponent
    ],
    declarations: [
        AdminComponent,
        AuditComponent,
        MetricsComponent,
        ConfigComponent,
        ApiComponent,
        UsersComponent,
        DashboardComponent
    ]
})
export class AdminModule { }
