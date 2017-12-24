import { HttpErrorEvents } from './../shared/http-error-events';
import { RadioService } from './../services/radio.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService, ToastMessage } from './../components/notification/notification.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable()
export class JhispterHttpErrorInterceptor implements HttpInterceptor {
    private notificationService: NotificationService;
    private translateService: TranslateService;

    constructor(private injector: Injector, private radio: RadioService) {
    }

    public intercept(req: any, next: any) {
        return next.handle(req).catch((httpResponse: HttpEvent<any>) => {
            this.notificationService = this.injector.get(NotificationService);
            this.translateService = this.injector.get(TranslateService);
            if (httpResponse instanceof HttpErrorResponse) {
                let errorcode;
                let errorparam;

                let responseBody;
                let trmessage;
                let trtitle;
                let trtype;

                let keys;
                let headers;
                try {
                    responseBody = JSON.parse(httpResponse.error);
                } catch (e) {
                    // Not a json object
                }

                switch (httpResponse.status) {
                    // connection refused, server not reachable
                    case 0:
                        trmessage = this.translateService.instant('global.error.server.not.reachable.msg');
                        trtitle = this.translateService.instant('global.error.server.not.reachable');
                        trtype = 'error';
                        break;
                    case 200:
                        keys = Array.from(httpResponse.headers.keys());
                        headers = [];
                        for (const key of keys) {
                            if (key.toLocaleLowerCase().endsWith('app-alert') || key.toLocaleLowerCase().endsWith('app-params')) {
                                headers.push(key);
                            }
                        }
                        headers.sort();
                        if (headers.length > 1) {
                            errorcode = httpResponse.headers.get(headers[0]);
                            errorparam = httpResponse.headers.get(headers[1]);
                        }
                        if (errorcode) {
                            trtitle = this.translateService.instant('global.' + errorcode);
                            trmessage = '';
                            trtype = 'alert';
                        }
                        break;
                    case 400:
                        keys = Array.from(httpResponse.headers.keys());
                        headers = [];
                        for (const key of keys) {
                            if (key.toLocaleLowerCase().endsWith('app-error') || key.toLocaleLowerCase().endsWith('app-params')) {
                                headers.push(key);
                            }
                        }
                        headers.sort();
                        if (headers.length > 1) {
                            errorcode = httpResponse.headers.get(headers[0]);
                            errorparam = httpResponse.headers.get(headers[1]);
                        }
                        if (errorcode) {
                            trtitle = this.translateService.instant('global.' + errorcode);
                            trmessage = '';
                            trtype = 'error';
                        } else if (responseBody && responseBody !== '' && responseBody.fieldErrors) {
                            const fieldErrors = responseBody.fieldErrors;
                            for (const fieldError of fieldErrors) {
                                // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                                const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                                trtitle = this.translateService.instant('global.' + responseBody.message);
                                trmessage = this.translateService
                                    .instant('global.error.' + fieldError.message, { fieldName: convertedField });
                                trtype = 'error';
                            }
                        } else if (responseBody && responseBody !== '' && responseBody.message) {
                            trmessage = this.translateService.instant(responseBody.message);
                            trtitle = this.translateService.instant(responseBody.decscription);
                            trtype = 'error';
                        } else {
                            // Error a direct message from server
                            trmessage = this.translateService.instant(httpResponse.error);
                            trtitle = this.translateService.instant('global.error.badrequest');
                            trtype = 'error';
                        }
                        break;
                    case 401:
                        if (responseBody && responseBody !== '' && responseBody.message) {
                            trmessage = this.translateService.instant(responseBody.message);
                            trtitle = this.translateService.instant('global.error.unauthorized');
                            trtype = 'error';
                        } else {
                            trmessage = undefined;
                            trtitle = undefined;
                            trtype = undefined;
                            // Will be handled by the signin component
                        }
                        break;

                    case 404:
                        trmessage = this.translateService.instant('global.error.url.not.found');
                        trtitle = this.translateService.instant('global.error.url.not.found');
                        trtype = 'error';
                        break;

                    case 500:
                        if (responseBody && responseBody !== '' && responseBody.message) {
                            trmessage = this.translateService.instant(responseBody.message);
                            trtitle = this.translateService.instant('global.error.internalServerError');
                            trtype = 'error';
                        } else {
                            trmessage = 'Unhandeled error';
                            trtitle = 'Unhandeled error';
                            trtype = 'error';
                        }
                        break;

                    default:
                        if (responseBody && responseBody !== '' && responseBody.message) {
                            trmessage = this.translateService.instant(responseBody.message);
                            trtitle = '';
                            trtype = 'error';
                        } else {
                            trmessage = 'Unhandeled error';
                            trtitle = 'Unhandeled error';
                            trtype = 'error';
                        }
                        break;
                }
                if (!_.isNil(trmessage) && !_.isNil(trtitle)) {
                    this.radio.cast(HttpErrorEvents.httpError, { message: trmessage, title: trtitle, type: trtype } as ToastMessage);
                }
            }
            return Observable.throw(httpResponse);
        });
    }
}
