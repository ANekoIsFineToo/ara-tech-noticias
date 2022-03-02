import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';

import { SessionQuery } from '@att/core';
import { Role } from '@att/domain';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly sessionQuery: SessionQuery) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<true | UrlTree> {
    const validRoles = (route.data['roles'] ?? []) as Role[];
    return this.sessionQuery.selectUser$.pipe(
      first(),
      // if user lacks access permissions redirect to base page
      map(user => validRoles.includes(user?.role as Role) ? true : this.router.createUrlTree(['/'])),
    );
  }
}
