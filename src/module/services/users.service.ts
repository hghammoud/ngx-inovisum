import { UserDTO, User } from './../typings/jhipster';
import { createRequestOption } from './../shared/request-utils';
import { PageableSearchQuery } from './pagination';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class UsersAbstractService {
    public abstract getAll(req: PageableSearchQuery): Observable<HttpResponse<UserDTO[]>>;
    public abstract get(term: string): Observable<UserDTO>;
    public abstract update(user: UserDTO): Observable<UserDTO>;
    public abstract create(user: UserDTO): Observable<UserDTO>;
}
