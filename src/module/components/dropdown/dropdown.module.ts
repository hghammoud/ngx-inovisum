import { DropDownTriggerDirective } from './dropdown-trigger.directive';
import { ButtonModule } from './../button/button.module';
import { DropdownItemComponent } from './dropdown-item.component';
import { DropdownComponent } from './dropdown.component';
import { InovisumSharedModule } from './../../inovisum.shared.module';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
@NgModule({
    imports: [
        InovisumSharedModule,
        ButtonModule,
        OverlayModule
    ],
    declarations: [
        DropdownComponent,
        DropdownItemComponent,
        DropDownTriggerDirective
    ],
    exports: [
        DropdownComponent,
        DropdownItemComponent,
        DropDownTriggerDirective
    ]
})
export class DropDownModule { }
