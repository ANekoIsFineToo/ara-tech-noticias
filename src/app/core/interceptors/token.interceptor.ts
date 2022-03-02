import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { first, mergeMap, Observable } from 'rxjs';

import { SessionQuery } from '../stores';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly sessionQuery: SessionQuery) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.sessionQuery.selectToken$.pipe(first(), mergeMap((token) => {
      // if token is available and request targets API add token
      if (token != null && req.url.startsWith('att://')) {
        return next.handle(req.clone({ setHeaders: { token } }))
      }

      return next.handle(req);
    }));
  }
}
