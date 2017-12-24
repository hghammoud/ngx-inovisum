import { FrameworkDeniedComponent } from './framework-denied.component';
import { Routes } from '@angular/router';

export const DENIED_ROUTES: Routes = [
  {
    path: 'accessdenied',
    component: FrameworkDeniedComponent
  },
];
