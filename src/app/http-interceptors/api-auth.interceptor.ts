import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorizedReq: HttpRequest<any> = req.clone({
      url: req.url.split('?').length > 1 ?  `${req.url}&apikey=${environment.API_KEY}` :  `${req.url}?apikey=${environment.API_KEY}`
    });

    return next.handle(authorizedReq);
  }
}
