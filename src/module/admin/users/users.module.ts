import { TableModule } from './../../components/table/table.module';
import { SelectModule } from './../../components/select/select.module';
import { TagModule } from './../../components/tag/tag.module';
import { DropDownModule } from './../../components/dropdown/dropdown.module';
import { ButtonModule } from './../../components/button/button.module';
import { AdminSharedModule } from './../admin.shared.module';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { MatIconModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [
        AdminSharedModule,
        ButtonModule,
        DropDownModule,
        TagModule,
        SelectModule,
        TableModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        UsersComponent
    ]
})
export class AdminUsersModule { }
