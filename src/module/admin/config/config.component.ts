import { Subject } from 'rxjs/Subject';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ManagementService } from './../../services/management.service';
import { merge } from 'rxjs/observable/merge';
import { Component, OnInit, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import * as _ from 'lodash';

@Component({
    selector: 'ino-admin-config',
    templateUrl: 'config.component.html',
    styleUrls: ['./config.component.scss'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({ transform: 'scaleY(0)', opacity: 0 }),
                    animate('200ms ease-in-out', style({ transform: 'scaleY(1)', opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ opacity: 1 }),
                    animate('200ms ease-in-out', style({ height: 0, opacity: 0 }))
                ])
            ]
        )
    ]
})
export class ConfigComponent implements OnInit {
    public loading = false;
    public config: any;
    public originalconfig: any;
    public pageSize = 25;
    public step = -1;

    private term$ = new Subject<string>();
    constructor(
        private managementService: ManagementService) {
    }

    public ngOnInit() {
        this.loadConfig();

        // Implementing filter logic
        this.term$.debounceTime(400)
            .filter((term) => term.length >= 0)
            .distinctUntilChanged().subscribe((pattern) => {
                this.config = _.chain(this.originalconfig).cloneDeep().reduce((obj, value, key) => {
                    obj[key] = _.filter(value, (o) => ('' + o.name).indexOf(pattern) !== -1);
                    return obj;
                }, {}).omitBy(_.isEmpty).value();
            });
    }
    public keys(dict: any): string[] {
        return (dict === undefined) ? [] : Object.keys(dict);
    }

    public setStep(index: number) {
        this.step = index;
    }

    public nextStep() {
        this.step++;
    }

    public prevStep() {
        this.step--;
    }

    public filter(value: any) {
        this.term$.next(value);
    }

    private flatten(object: object, separator = '.'): object {
        const isValidObject = (value: any): boolean => {
            if (!value) { return false; }
            const isArray = Array.isArray(value);
            const isBuffer = Buffer.isBuffer(value);
            const isΟbject = Object.prototype.toString.call(value) === '[object Object]';
            const hasKeys = !!Object.keys(value).length;
            return !isArray && !isBuffer && isΟbject && hasKeys;
        };
        return Object.assign({}, ...function _flatten(child, path: any[] = []): any {
            return [].concat(...Object.keys(child)
                .map((key) => isValidObject(child[key])
                    ? _flatten(child[key], path.concat([key]))
                    : { [path.concat([key]).join(separator)]: child[key] }));
        }(object));
    }

    private loadConfig() {
        const obs: Observable<Array<HttpResponse<string>>> = Observable
            .zip(this.managementService.getConfig(), this.managementService.getEnvConfig());
        obs.subscribe((result) => {
            const config = _.map(result[0].body, (value: any, key) => {
                return _.reduce(value.properties, (o, v, p) => {
                    o[value.prefix + '.' + p] = v;
                    return o;
                }, {});
            });
            let r = Object.assign.apply({}, config);
            r = this.flatten(r);
            this.originalconfig = _.chain(result[1].body).merge({ springConfig: r }).reduce((obj, value, key) => {
                obj[key] = _.map(value, (v, p) => _.merge({}, { name: p, value: v }));
                return obj;
            }, {}).value();

            this.config = _.chain(this.originalconfig).cloneDeep().omitBy(_.isEmpty).value();
        });
    }

}
