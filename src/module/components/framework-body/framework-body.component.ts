import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { InoComponent } from '../ino.component';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'ino-body',
    templateUrl: 'framework-body.component.html',
    styleUrls: ['./framework-body.component.scss']
})

export class FrameworkBodyComponent extends InoComponent {
    // Initialising the translation service to the default value
    // Linking the page title service to the router
    constructor(private router: Router, private activatedRoute: ActivatedRoute,
        private titleService: Title, private translateService: TranslateService) {
        super();
        this.translateService.setDefaultLang('en');
        this.translateService.use('en');
        this.addSubscription(
            this.router.events
                .filter((event) => {
                    return event instanceof NavigationEnd;
                })
                .map(() => this.activatedRoute)
                .map((route) => {
                    while (route.firstChild) { route = route.firstChild; }
                    return route;
                })
                .filter((route) => route.outlet === 'primary')
                .mergeMap((route) => route.data)
                .subscribe((event) => {
                    if (!_.isNil(event['title'])) {
                        let title = this.translateService.instant(event['title']);
                        this.titleService.setTitle(title);
                        this.translateService.onLangChange.subscribe((change: any) => {
                            title = this.translateService.instant(event['title']);
                            this.titleService.setTitle(title);
                        });
                    }
                })
        );
    }
}
