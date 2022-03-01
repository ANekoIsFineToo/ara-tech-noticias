import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { SessionState } from '../../interfaces';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session', resettable: true })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super({});
  }
}
