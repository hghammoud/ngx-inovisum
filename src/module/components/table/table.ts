import { TemplateRef } from '@angular/core';
export interface TableAction {
    name: string;
    icon: string;
    eventname: string;
    color?: string;
}

export interface TableColumn {
    name: string;
    key: string;
    type: string;
    show: boolean;
    editable?: boolean;
    minWidth?: string;
    autogrow?: boolean;
    active?: boolean;
    sortable?: boolean;
    centerHeader?: boolean;
    fontWeight?: string,
    sorting?: 'asc' | 'desc' | string;
    template?: any;
}

export interface TableRow {
    data: any;
    editMode: boolean;
}

export interface TableSortAction {
    key: string;
    type: 'asc' | 'desc' | string;
}
