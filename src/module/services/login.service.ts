import { PrincipalService } from './principal.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthAbstractService } from './auth.service';

@Injectable()
export class LoginService {
    constructor(
        private authService: AuthAbstractService,
        private principal: PrincipalService
    ) { }

    public login(credentials: any): Observable<any> {
        return this.authService.login(credentials).map((data) => {
            this.principal.identity(true).then((account) => {
                // After the login the language will be changed to
                // the language selected by the user during his registration
                if (account !== null) {
                    // this.languageService.changeLanguage(account.langKey);
                }
            });
        }, (err: any) => {
            this.logout();
            return Observable.throw(err);
        });
    }

    public loginWithToken(jwt: any, rememberMe: any) {
        return this.authService.loginWithToken(jwt, rememberMe);
    }

    public logout() {
        this.authService.logout().subscribe();
        this.principal.authenticate(null);
    }

    public resetPasswordInit(mail: string): Observable<any> {
        return this.authService.resetPasswordInit(mail);
    }
    public resetPasswordFinish(keyAndPassword: any): Observable<any> {
        return this.authService.resetPasswordFinish(keyAndPassword);
    }
}
