import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

import { New } from '@att/domain';
import { NewsService } from '@att/shared';

@Injectable({ providedIn: 'root' })
export class NewResolver implements Resolve<New> {
  constructor(private readonly newsService: NewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<New> {
    const uuid = route.paramMap.get('newUuid');
    return uuid == null ? EMPTY :  this.newsService.get(uuid);
  }
}
