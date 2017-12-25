import { DialogService } from './../components/dialog/dialog.service';
import { SigninComponent } from './../components/sign-in/sign-in.component';
import { ObjectReducer } from './../store/object.reducer';
import { Store } from '@ngrx/store';
import { PrincipalService } from './principal.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private dialogService: DialogService,
        private principal: PrincipalService,
        private store: Store<any>) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

        const authorities = route.data['authorities'];
        if (!authorities || authorities.length === 0) {
            return true;
        }

        return this.checkLogin(authorities, state.url);
    }

    public checkLogin(authorities: string[], url: string): Promise<boolean> {
        const principal = this.principal;
        return Promise.resolve(principal.identity().then((account) => {

            if (account && principal.hasAnyAuthorityDirect(authorities)) {
                return true;
            }

            this.store.dispatch(ObjectReducer.set('previousUrl', url));
            this.router.navigate(['accessdenied']).then(() => {
                // only show the login dialog, if the user hasn't logged in yet
                if (!account) {
                    this.dialogService.open(SigninComponent);
                }
            });
            return false;
        }));
    }
}
