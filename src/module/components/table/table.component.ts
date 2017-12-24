import { Subject } from 'rxjs/Subject';
import { InoComponent } from './../ino.component';
import { TableColumn, TableAction, TableSortAction, TableRow } from './table';
import { Page } from './../../';
import { RadioService } from './../../services/radio.service';
import {
    Component, OnInit, Input, EventEmitter, Output, OnChanges,
    AfterViewInit, ViewChild, ViewChildren, ElementRef, HostListener, TemplateRef
} from '@angular/core';
import {
    trigger,
    state,
    transition,
    animate,
    style
} from '@angular/animations';
import * as _ from 'lodash';

@Component({
    selector: 'ino-table',
    templateUrl: './table.component.html',
    styleUrls: ['table.component.scss'],
    animations: [
        trigger(
            'activeRowAnimation', [
                transition(':enter', [
                    style({
                        height: 0,
                        opacity: 0
                    }),
                    animate('300ms ease-in-out')
                ]),
                transition(':leave', [
                    animate('300ms ease-in-out', style({
                        height: 0,
                        opacity: 0
                    }))
                ])
            ]
        )
    ],
})
export class TableComponent extends InoComponent implements OnChanges, AfterViewInit {

    public checkedItems: { [key: string]: any; } = {};

    @Input() public multipleSelect = true;
    @Input() public showHeader = true;
    @Input() public rowAutoHeight = false;
    @Input() public isCompact = false;
    @Input() public page: Page;

    @Input() public data: any[] = [];
    @Input() public columns: TableColumn[] = [];
    @Input() public showRowTemplate: EventEmitter<{ template: TemplateRef<any>, row: any }>;
    @Input() public hideRowTemplate: EventEmitter<any>;

    @Output() public onPageChange: EventEmitter<number> = new EventEmitter();
    @Output() public onSort: EventEmitter<TableSortAction> = new EventEmitter();
    @Output() public onDoubleClick: EventEmitter<any> = new EventEmitter();
    @Output() public onClick: EventEmitter<any> = new EventEmitter();
    @Output() public onChecked: EventEmitter<any> = new EventEmitter();

    public rows: TableRow[] = [];
    public bodyCellMap: any[] = [];
    public headerCellMap: any[] = [];
    public columnSorting = '';

    private activeRow: any;
    private activeRowTemplate: TemplateRef<any>;

    constructor(private radio: RadioService) {
        super();

    }

    public ngOnChanges(changes: any) {
        if (changes['data']) {
            this.dataToRows();
        }
        if (changes['showRowTemplate']) {
            this.addSubscription(this.showRowTemplate.subscribe((o: any) => {
                this.toggleActiveRow(o);
            }));
        }
        if (changes['hideRowTemplate']) {
            this.addSubscription(this.hideRowTemplate.subscribe(() => {
                this.hideActiveRow();
            }));
        }
    }

    public sort(column: TableColumn) {

        // First we rest the other columns sorting values
        _.forEach(this.columns, (cell: any) => {
            if (cell !== column) {
                cell.active = false;
                cell.sorting = '';
            }
        });

        // Setting the sorted column values
        if (column.sorting === '') {
            column.active = true;
            column.sorting = 'asc';
        } else if (column.sorting === 'asc') {
            column.active = true;
            column.sorting = 'desc';
        } else {
            column.active = false;
            column.sorting = '';
        }

        // Emmiting the sorting action
        if (column.active) {
            this.onSort.emit({ key: column.key, type: column.sorting });
        } else {
            this.onSort.emit({ key: '', type: '' });
        }
    }

    public ngAfterViewInit() {
        setTimeout(() => this.redraw(), 0);
    }

    public redraw() {
        _.forEach(this.columns, (cell: any, index: any) => {
            const o = this.bodyCellMap[index];
            if (!_.isNil(o)) {
                const width = o.offsetWidth;
                this.headerCellMap[index].style.minWidth = width + 'px';
            }
        });
    }

    public getStyle(element: Event, cell: TableColumn, cellIndex?: number, isBody?: boolean) {
        // We save all the elements in an array
        if (isBody && _.isNil(this.bodyCellMap[cellIndex])) {
            this.bodyCellMap[cellIndex] = element;
        }
        if (!isBody && _.isNil(this.headerCellMap[cellIndex])) {
            this.headerCellMap[cellIndex] = element;
        }

        if (cell.autogrow) {
            return {
                flex: '1 0 auto',
            };
        }
    }

    // Setting activerow and active template if not set already
    // else unset allowing toggle
    private toggleActiveRow(o: any) {
        if (this.activeRow !== o.row) {
            this.activeRowTemplate = o.template;
            this.activeRow = o.row;
        } else {
            this.activeRowTemplate = undefined;
            this.activeRow = undefined;
        }
    }
    // Unsetting active tempate
    private hideActiveRow() {
        this.activeRowTemplate = undefined;
        this.activeRow = undefined;
    }
    private dataToRows() {
        const rows: any[] = [];
        _.forEach(this.data, (value: any) => {
            rows.push({ data: value, editMode: false, checked: false });
        });
        this.rows = rows;
    }

}
