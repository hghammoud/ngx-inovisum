import { LanguageModule } from './../components/language-picker/language.module';
import { LeftMenuModule } from './../components/leftmenu/leftmenu.module';
import { DropDownModule } from './../components/dropdown/dropdown.module';
import { ButtonModule } from './../components/button/button.module';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { AdminSharedModule } from './admin.shared.module';
import { AdminMetricsModule } from './metrics/metrics.module';
import { AdminUsersModule } from './users/users.module';
import { AdminDashboardModule } from './dashboard/dashboard.module';
import { AdminConfigModule } from './config/config.module';
import { AdminAuditModule } from './audit/audit.module';
import { AdminApiModule } from './api/api.module';
import { AdminComponent } from './admin.component';
import { ADMIN_ROUTES } from './admin.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        AdminSharedModule,
        AdminApiModule,
        AdminAuditModule,
        AdminConfigModule,
        AdminDashboardModule,
        AdminUsersModule,
        AdminMetricsModule,
        MatIconModule,
        MatButtonModule,
        ButtonModule,
        DropDownModule,
        LanguageModule,
        LeftMenuModule,
        RouterModule.forChild([...ADMIN_ROUTES])
    ],
    exports: [
    ],
    declarations: [
        AdminComponent
    ]
})
export class AdminModule { }
