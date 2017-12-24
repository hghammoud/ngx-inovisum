import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { InoComponent } from './../components/ino.component';
import { LeftMenuComponent } from './../components/leftmenu/leftmenu.component';
import { Language } from './../components/language-picker/language';
import { LoginService } from './../services/login.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'ino-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends InoComponent {
    public menuIconState = 'closed';
    @ViewChild(LeftMenuComponent) private leftmenu: LeftMenuComponent;
    constructor(private loginService: LoginService, private router: Router, private titleService: Title) {
        super();
    }

    public logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }

    public toggleMenu() {
        this.leftmenu.toggleMenu();
        switch (this.menuIconState) {
            case 'closed':
                this.menuIconState = 'slim';
                break;
            case 'slim':
                this.menuIconState = 'open';
                break;
            default:
                this.menuIconState = 'closed';
                break;
        }
    }

    public getTitle() {
        return this.titleService.getTitle();
    }

}
