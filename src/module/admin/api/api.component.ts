import { Component, AfterViewInit, ElementRef } from '@angular/core';
// import { swaggerUIBundle, swaggerUIStandalonePreset } from '../../../polyfills.browser';
// import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';
@Component({
    selector: 'ino-admin-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
})
export class ApiComponent implements AfterViewInit {
    constructor(private el: ElementRef) {
    }

    public ngAfterViewInit() {
        // const ui = swaggerUIBundle({
        //     url: API_URL + 'v2/api-docs',
        //     domNode: this.el.nativeElement.querySelector('.swagger-container'),
        //     deepLinking: true,
        //     presets: [
        //         swaggerUIBundle.presets.apis,
        //         swaggerUIStandalonePreset
        //     ],
        //     plugins: [
        //         swaggerUIBundle.plugins.DownloadUrl
        //     ],
        //     layout: 'StandaloneLayout'
        // });
    }
}
