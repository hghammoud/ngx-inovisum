import { DENIED_ROUTES } from './denied.routes';
import { RouterModule } from '@angular/router';
import { FrameworkDeniedComponent } from './framework-denied.component';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        RouterModule.forChild([...DENIED_ROUTES]),
    ],
    declarations: [
        FrameworkDeniedComponent
    ]
})
export class FrameworkDeniedModule { }
