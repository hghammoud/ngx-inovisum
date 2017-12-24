import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RolesService {
    public API_URL = 'http://192.168.2.112:8080/';
    private resourceUrl = this.API_URL + 'api/users/authorities';

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<HttpResponse<string[]>> {
        return this.http.get<string[]>(this.resourceUrl, { observe: 'response'});
    }

}
