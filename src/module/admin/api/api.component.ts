import { Component, AfterViewInit, ElementRef } from '@angular/core';

export const swaggerUIBundle = require('swagger-ui-dist').SwaggerUIBundle;
export const swaggerUIStandalonePreset = require('swagger-ui-dist').SwaggerUIStandalonePreset;

@Component({
    selector: 'ino-admin-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
})
export class ApiComponent implements AfterViewInit {
    public API_URL = 'http://192.168.0.23:8080/';
    constructor(private el: ElementRef) {
    }
    public ngAfterViewInit() {
        const ui = swaggerUIBundle({
            url: this.API_URL + 'v2/api-docs',
            domNode: this.el.nativeElement.querySelector('.swagger-container'),
            deepLinking: true,
            presets: [
                swaggerUIBundle.presets.apis,
                swaggerUIStandalonePreset
            ],
            plugins: [
                swaggerUIBundle.plugins.DownloadUrl
            ],
            layout: 'StandaloneLayout'
        });
    }
}
