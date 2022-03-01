import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map } from 'rxjs';

import { SessionState } from '../../interfaces';
import { SessionStore } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  readonly selectUser$ = this.select('user');
  readonly selectToken$ = this.select('token');

  readonly selectIsLoggedIn$ = this.selectToken$.pipe(map(token => token != null));

  constructor(store: SessionStore) {
    super(store);
  }
}
