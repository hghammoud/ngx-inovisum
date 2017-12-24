import { Page, Sort, PageableSearchQuery } from './../services/pagination';
import { HttpParams, HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';

export const createRequestOption = (req?: any): HttpParams => {
    let params = new HttpParams();
    if (req) {
        params = params.set('page', req.page);
        params = params.set('size', req.size);
        if (req.sort) {
            _.forEach(req.sort, (s: any) => {
                params = params.set('sort', s.property + ',' + s.direction);
            });
        }
        params = params.set('query', req.query);
    }
    return params;
};

export const createPageableSearchQuery = (_query?: HttpParams, _page?: number, _size?: number, _sort?: Sort[]): PageableSearchQuery => {
    let params = {
        page: _page,
        size: _size,
        sort: _sort
    };
    const para = _.reduce(_query.keys(), (o, v, k) => {
        o[v] = _query.get(v);
        return o;
    }, {});
    params = _.merge(params, para);
    return params;
};

export const extractPage = (res: HttpResponse<any>): Page => {
    return {
        currentPage: +res.headers.get('X-Page-Number'),
        totalPages: +res.headers.get('X-Total-Pages'),
        totalElements: +res.headers.get('X-Total-Elements'),
        pageElements: +res.headers.get('X-Page-Elements'),
    };
};
