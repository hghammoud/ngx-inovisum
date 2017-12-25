import { createRequestOption } from './../shared/request-utils';
import { PageableSearchQuery } from './pagination';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ManagementService {
    public API_URL = 'http://192.168.0.23:8080/';
    private metricsUrl = this.API_URL + 'management/metrics';
    private configUrl = this.API_URL + 'management/configprops';
    private envUrl = this.API_URL + 'management/env';
    private auditsUrl = this.API_URL + 'management/audits';

    constructor(private http: HttpClient) {
    }

    public getMetrics(): Observable<HttpResponse<string>> {
        return this.http.get<string>(this.metricsUrl, { observe: 'response'});
    }

    public getConfig(): Observable<HttpResponse<string>> {
        return this.http.get<string>(this.configUrl, { observe: 'response'});
    }

    public getEnvConfig(): Observable<HttpResponse<string>> {
        return this.http.get<string>(this.envUrl, { observe: 'response'});
    }

    public getAudits(req: PageableSearchQuery): Observable<HttpResponse<string[]>> {
        const httpParams = createRequestOption(req);
        return this.http.get<string[]>(this.auditsUrl, { observe: 'response', params: httpParams});
    }

}
