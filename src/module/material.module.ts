import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    MatFormFieldModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRippleModule,
        MatIconModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatExpansionModule,
        OverlayModule,
        FlexLayoutModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRippleModule,
        MatIconModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatExpansionModule,
        OverlayModule,
        FlexLayoutModule
    ]
})
export class MaterialModule { }
