import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, map } from 'rxjs';

import { SessionQuery, SessionService } from '@att/core';

import { AuthFormValue } from './interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'att-auth',
  templateUrl: './auth.container.html',
  styleUrls: ['./auth.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthContainer {
  readonly showSignUp$ = this.route.url.pipe(map((url) => url[0].path === 'sign-up'));
  readonly loading$ = this.sessionQuery.selectLoading();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly matSnackBar: MatSnackBar,
    private readonly sessionService: SessionService,
    private readonly sessionQuery: SessionQuery,
  ) { }

  send(value: AuthFormValue): void {
    this.showSignUp$.pipe(first()).subscribe((showSignUp) => {
      const { name, email, password } = value;
      const request$ = showSignUp
        ? this.sessionService.signUp(name as string, email, password)
        : this.sessionService.signIn(email, password);

      request$.subscribe({
        next: (user) => {
          const message = showSignUp
            ? $localize`:@@authRootSnackbarSignedUp:Bienvenido ${user.name}:username:, tu usuario se ha creado correctamente`
            : $localize`:@@authRootSnackbarSignedIn:Bienvenido de vuelta ${user.name}:username:`;

          this.matSnackBar.open(message);

          this.router.navigate(['..'], { relativeTo: this.route });
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404 || err.status === 401) {
            const message = $localize`:@@authRootSnackbarUserNotFound:Las credenciales introducidas no han sido encontradas`;
            this.matSnackBar.open(message, undefined, {
              politeness: 'assertive',
              duration: 5000,
            })
          }
        },
      });
    });
  }
}
