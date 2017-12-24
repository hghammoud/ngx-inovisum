import { UserDTO } from './../typings/jhipster';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AuthAbstractService } from './auth.service';

@Injectable()
export class PrincipalService {
    private userIdentity: UserDTO;
    private authenticated = false;
    private authenticationState = new Subject<any>();

    constructor(
        private authService: AuthAbstractService
    ) { }

    public authenticate(identity: any) {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }

    public hasAnyAuthority(authorities: string[]): Promise<boolean> {
        return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
    }

    public hasAnyAuthorityDirect(authorities: string[]): boolean {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }

        for (const authority of authorities) {
            if (this.userIdentity.authorities.indexOf(authority) !== -1) {
                return true;
            }
        }

        return false;
    }

    public hasAuthority(authority: string): Promise<boolean> {
        if (!this.authenticated) {
            return Promise.resolve(false);
        }

        return this.identity().then((id) => {
            return Promise.resolve(id.authorities && id.authorities.indexOf(authority) !== -1);
        }, () => {
            return Promise.resolve(false);
        });
    }

    public identity(force?: boolean): Promise<UserDTO> {
        if (force === true) {
            this.userIdentity = undefined;
        }

        // check and see if we have retrieved the userIdentity data from the server.
        // if we have, reuse it by immediately resolving
        if (this.userIdentity) {
            return Promise.resolve(this.userIdentity);
        }

        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.authService.getIdentity().toPromise().then((identity) => {
            if (identity) {
                this.userIdentity = identity;
                this.authenticated = true;
            } else {
                this.userIdentity = null;
                this.authenticated = false;
            }
            this.authenticationState.next(this.userIdentity);
            return this.userIdentity;
        }).catch((err) => {
            this.userIdentity = null;
            this.authenticated = false;
            this.authenticationState.next(this.userIdentity);
            return null;
        });
    }

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public isIdentityResolved(): boolean {
        return this.userIdentity !== undefined;
    }

    public getAuthenticationState(): Observable<any> {
        return this.authenticationState.asObservable();
    }

    public getImageUrl(): string {
        return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
    }
}
