import { UserDTO } from './../typings/jhipster';
import { UserIdentity } from './user-identity';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable()
export abstract class AuthAbstractService {
    constructor(
        public $localStorage: LocalStorageService,
        public $sessionStorage: SessionStorageService,
    ) { }

    public abstract login(credentials: any): Observable<any>;
    public abstract resetPasswordInit(mail: string): Observable<any>;
    public abstract resetPasswordFinish(keyAndPassword: any): Observable<any>;
    public abstract getIdentity(): Observable<UserDTO>;
    public abstract saveIdentity(account: UserDTO): Observable<UserDTO>;

    public getToken() {
        return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    }

    public loginWithToken(jwt: any, rememberMe: any) {
        if (jwt) {
            this.storeAuthenticationToken(jwt, rememberMe);
            return Promise.resolve(jwt);
        } else {
            return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
        }
    }

    public storeAuthenticationToken(jwt: any, rememberMe: any) {
        if (rememberMe) {
            this.$localStorage.store('authenticationToken', jwt);
        } else {
            this.$sessionStorage.store('authenticationToken', jwt);
        }
    }

    public logout(): Observable<any> {
        return new Observable((observer) => {
            this.$localStorage.clear('authenticationToken');
            this.$sessionStorage.clear('authenticationToken');
            observer.complete();
        });
    }
}
