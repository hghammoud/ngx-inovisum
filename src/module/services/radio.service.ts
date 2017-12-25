import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/distinct';

const star = '*';
const twoStars = '**';

export interface RadioEvent {
    key: string;
    data?: any;
}

export class RadioService {
    private separator = ':';
    private _eventBus = new Subject<RadioEvent>();
    private _eventCacheBus = new ReplaySubject<RadioEvent>();

    public on(key: string, count?: number): Observable<any> {
        const _this = this;

        const normalObservable = this._eventBus
            .filter((event: RadioEvent) => _this.keyMatch(event.key, key))
            .map((event: RadioEvent) => event.data);

        const withoutReplay = _.isNil(count);
        if (withoutReplay) {
            return normalObservable;
        }

        const subject = new ReplaySubject<number>(count);
        this._eventCacheBus
            .filter((event: RadioEvent) => _this.keyMatch(event.key, key))
            .map((event: RadioEvent) => event.data)
            .subscribe((value) => subject.next(value));

        return Observable
            .merge(normalObservable, subject)
            .distinct();
    }

    public cast(_key: string, _data?: any): void {
        if (typeof _key !== 'string' || _key.length <= 0) {
            throw new Error(`Bad key '${JSON.stringify(_key)}'. Please provide a non-empty string.`);
        }

        this._eventBus.next({ key: _key, data: _data });
        this._eventCacheBus.next({ key: _key, data: _data });
    }

    private keyMatch(eventKey: string, listenerKey: string): boolean {
        const isMatch = (wildcard: any, key: any) => (wildcard === star) || (wildcard === key);

        const eventKeyArray = eventKey.split(this.separator);
        const listenerKeyArray = listenerKey.split(this.separator);

        const keyWildcardPairs = eventKeyArray
            .reduce((accum, current, index) => {
                accum.push([current, listenerKeyArray[index]]);
                return accum;
            }, [] as string[][]);

        let isWildcard = false;
        return keyWildcardPairs.every((pair) => {
            const key = pair[0];
            const wildcard = pair[1];
            // '**' match all fragments
            if (wildcard === twoStars && (typeof key !== 'undefined')) {
                isWildcard = true;
                return true;
            }
            // test if fragments match
            if (isMatch(wildcard, key) || isWildcard) {
                return true;
            }
            return false;
        });
    }
}
