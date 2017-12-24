import { TableSortAction, TableColumn } from './../../components/table/table';
import { Page, PageableSearchQuery, Sort } from './../../services/pagination';
import { createPageableSearchQuery, extractPage } from './../../shared/request-utils';
import { Subject } from 'rxjs/Subject';
import { HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ManagementService } from './../../services/management.service';
import { merge } from 'rxjs/observable/merge';
import { Component, OnInit, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import * as _ from 'lodash';

@Component({
    selector: 'ino-admin-audit',
    templateUrl: 'audit.component.html',
    styleUrls: ['./audit.component.scss'],
})
export class AuditComponent implements OnInit {
    public loading = false;

    public columns: TableColumn[];
    public showRowTemplate: EventEmitter<{ template: TemplateRef<any>, row: any }> = new EventEmitter();
    public hideRowTemplate: EventEmitter<any> = new EventEmitter();
    public audits: any[];
    public page: Page;
    public pageSize = 25;

    private term$ = new Subject<string>();
    constructor(
        private managementService: ManagementService) {
    }

    public ngOnInit() {
        const params = new HttpParams().set('fromDate', 's').set('toDate', 'ss');
        const query = createPageableSearchQuery(params, 0, this.pageSize);
        this.triggerSearch(query);
    }

    public loadPage(pageNumber: number) {
        const params = new HttpParams().set('fromDate', 's').set('toDate', 'ss');
        const query = createPageableSearchQuery(params, pageNumber, this.pageSize);
        this.triggerSearch(query);
    }

    public sortPage(sortAction: TableSortAction) {
        const params = new HttpParams().set('fromDate', 's').set('toDate', 'ss');
        const sort: Sort = { property: sortAction.key, direction: sortAction.type };
        const query = createPageableSearchQuery(params, this.page.currentPage, this.pageSize, [sort]);
        this.triggerSearch(query);
    }

    public triggerSearch(query: PageableSearchQuery) {
        this.managementService.getAudits(query).first().subscribe((result) => {
            this.audits = result.body;
            this.page = extractPage(result);
        });
    }
}
