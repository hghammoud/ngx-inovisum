import { FrameworkBodyComponent } from './framework-body.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        RouterModule
    ],
    exports: [
        FrameworkBodyComponent
    ],
    declarations: [
        FrameworkBodyComponent
    ]
})
export class FrameworkBodyModule { }
