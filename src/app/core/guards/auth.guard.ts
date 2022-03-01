import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';

import { SessionQuery } from '../stores';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private static SIGN_IN_URL = '/sign-in';

  constructor(private readonly router: Router, private readonly sessionQuery: SessionQuery) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<true | UrlTree> {
    return this.sessionQuery.selectIsLoggedIn$.pipe(
      first(),
      // let the user pass if logged in, otherwise redirect to sign in page
      map(isLoggedIn => isLoggedIn ? true : this.router.createUrlTree([AuthGuard.SIGN_IN_URL])),
    );
  }
}
