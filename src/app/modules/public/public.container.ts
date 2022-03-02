import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resetStores } from '@datorama/akita';
import { first, mergeMap } from 'rxjs';

import { SessionQuery, SessionService } from '@att/core';

@Component({
  selector: 'att-public',
  templateUrl: './public.container.html',
  styleUrls: ['./public.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicContainer {
  readonly user$ = this.sessionQuery.selectUser$;

  constructor(
    private readonly router: Router,
    private readonly matSnackBar: MatSnackBar,
    private readonly sessionService: SessionService,
    private readonly sessionQuery: SessionQuery,
  ) { }

  turnUserToAdmin(): void {
    this.user$.pipe(first(), mergeMap(user => this.sessionService.turnUserToAdmin(user?.uuid as string))).subscribe((user) => {
      const message = $localize`:@@publicRootSnackBarUserTurnedToAdmin:${user.name}:username: ahora es administrador`;
      this.matSnackBar.open(message);
    });
  }

  logout(): void {
    // akita stores are emptied on logout
    this.router.navigate(['/sign-in']).then(() => resetStores());
  }
}
