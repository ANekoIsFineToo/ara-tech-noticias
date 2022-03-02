import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { New } from '@att/domain';
import { NewsService } from '@att/shared';

@Injectable({ providedIn: 'root' })
export class NewsResolver implements Resolve<New[]> {
  constructor(private readonly newsService: NewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<New[]> {
    return this.newsService.list();
  }
}
