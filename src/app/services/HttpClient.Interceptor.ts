import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.indexOf('servioceName') !== -1) {
            return next.handle(req)
                .catch((error, caught) => {
                    return Observable.throw(error);
                }) as any;
        } else {
            const authReq = req.clone({
              headers: req.headers.set('Content-Type', 'application/json; charset=utf-8')
                                  .set('Accept', 'application/json')
              });
            return next.handle(authReq)
                .do((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                  }
                }, (err: any) => {
                  if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                      // redirect to the login route
                      // or show a modal
                    }
                  }
                })
                .catch((error, caught) => {
                    return Observable.throw(error);
                }) as any;
        }
    }
}
