import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, map } from 'rxjs';

import { SessionQuery, SessionService } from '@att/core';

import { AuthFormValue } from './interfaces';

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
    private readonly matSnackbar: MatSnackBar,
    private readonly sessionService: SessionService,
    private readonly sessionQuery: SessionQuery,
  ) { }

  send(value: AuthFormValue): void {
    this.showSignUp$.pipe(first()).subscribe((showSignUp) => {
      const { name, email, password } = value;
      const request$ = showSignUp
        ? this.sessionService.signUp(name as string, email, password)
        : this.sessionService.signIn(email, password);

      request$.subscribe(() => {
        const message = showSignUp
          ? $localize`:@@authRootSnackbarSignedUp:Bienvenido ${name}:username:, tu usuario se ha creado correctamente`
          : $localize`:@@authRootSnackbarSignedIn:Bienvenido de vuelta ${name}:username:`;

        this.matSnackbar.open(message, undefined, {
          politeness: 'polite',
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });

        this.router.navigate(['..'], { relativeTo: this.route });
      });
    });
  }
}
