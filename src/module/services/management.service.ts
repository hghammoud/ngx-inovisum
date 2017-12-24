import { API_URL } from './../inovisum.module';
import { createRequestOption } from './../shared/request-utils';
import { PageableSearchQuery } from './pagination';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ManagementService {

    private metricsUrl = API_URL + 'management/metrics';
    private configUrl = API_URL + 'management/configprops';
    private envUrl = API_URL + 'management/env';
    private auditsUrl = API_URL + 'management/audits';

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
