import { AlertModule } from './../alert/alert.module';
import { SigninComponent } from './sign-in.component';
import { InovisumSharedModule } from './../../inovisum.shared.module';
import { NgModule } from '@angular/core';
import { MatIconModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [
        InovisumSharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        AlertModule
    ],
    declarations: [
        SigninComponent
    ],
    exports: [
        SigninComponent
    ],
    entryComponents: [SigninComponent]
})
export class SigninModule { }
