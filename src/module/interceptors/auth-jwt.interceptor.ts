import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class AuthJWTInterceptor implements HttpInterceptor {

    constructor(
        private localStorage: LocalStorageService,
        private sessionStorage: SessionStorageService
    ) { }
    public intercept(req: any, next: any) {
        const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
            }
        });
        return next.handle(req);
    }
}
