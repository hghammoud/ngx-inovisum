import { API_URL } from './../inovisum.module';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RolesService {

    private resourceUrl = API_URL + 'api/users/authorities';

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<HttpResponse<string[]>> {
        return this.http.get<string[]>(this.resourceUrl, { observe: 'response'});
    }

}
