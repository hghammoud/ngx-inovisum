import { MatIconModule, MatButtonModule } from '@angular/material';
import { TableModule } from './../../components/table/table.module';
import { ButtonModule } from './../../components/button/button.module';
import { AdminSharedModule } from './../admin.shared.module';
import { HighchartsModule } from './../../highcharts.module';
import { MetricsComponent } from './metrics.component';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        HighchartsModule,
        AdminSharedModule,
        TableModule,
        ButtonModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [
        MetricsComponent
    ]
})
export class AdminMetricsModule { }
