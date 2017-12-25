import { TagComponent } from './tag.component';
import { InovisumSharedModule } from './../../inovisum.shared.module';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        InovisumSharedModule,
    ],
    declarations: [
        TagComponent
    ],
    exports: [
        TagComponent
    ]
})
export class TagModule { }
