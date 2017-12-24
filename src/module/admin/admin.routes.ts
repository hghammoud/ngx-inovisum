import { ApiComponent } from './api/api.component';
import { AuditComponent } from './audit/audit.component';
import { ConfigComponent } from './config/config.component';
import { MetricsComponent } from './metrics/metrics.component';
import { AuthGuard } from './../services/auth-guard.service';
import { AdminComponent, UsersComponent, DashboardComponent } from './';
import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin',
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        data: {
          title: 'menu.button.dashboard'
        }
      },
      {
        path: 'users',
        component: UsersComponent,
        pathMatch: 'full',
        data: {
          title: 'menu.button.users'
        }
      },
      {
        path: 'metrics',
        component: MetricsComponent,
        pathMatch: 'full',
        data: {
          title: 'menu.button.metrics'
        }
      },
      {
        path: 'configuration',
        component: ConfigComponent,
        pathMatch: 'full',
        data: {
          title: 'menu.button.configuration'
        }
      },
      {
        path: 'audit',
        component: AuditComponent,
        pathMatch: 'full',
        data: {
          title: 'menu.button.audit'
        }
      },
      {
        path: 'api',
        component: ApiComponent,
        pathMatch: 'full',
        data: {
          title: 'menu.button.api'
        }
      }
    ]
  },
];
