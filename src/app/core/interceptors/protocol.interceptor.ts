import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@att/environments/environment';

@Injectable()
export class ProtocolInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    // att:// fake protocol is replaced with the correct api URL
    if (req.url.startsWith('att://')) {
      return next.handle(req.clone({ url: req.url.replace('att://', `${environment.apiUrl}/`) }));
    }

    return next.handle(req);
  }
}
