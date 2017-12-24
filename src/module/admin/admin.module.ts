// import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetricsComponent } from './metrics/metrics.component';
import { AdminComponent } from './admin.component';
import { ConfigComponent } from './config/config.component';
import { ApiComponent } from './api/api.component';
import { AuditComponent } from './audit/audit.component';
import { ADMIN_ROUTES } from './admin.routes';
import { HighchartsModule } from './../highcharts.module';
import { InovisumComponentsModule } from './../components/inovisumcomponents.module';
import { MaterialModule } from './../material.module';
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
        // UsersComponent,
        DashboardComponent
    ],
    declarations: [
        AdminComponent,
        AuditComponent,
        MetricsComponent,
        ConfigComponent,
        ApiComponent,
        // UsersComponent,
        DashboardComponent
    ]
})
export class AdminModule { }
