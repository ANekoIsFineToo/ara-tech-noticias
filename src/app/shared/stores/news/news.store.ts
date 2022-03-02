import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { NewsState } from '../../interfaces';

@StoreConfig({ name: 'news', idKey: 'uuid', resettable: true })
@Injectable({ providedIn: 'root' })
export class NewsStore extends EntityStore<NewsState> {
  constructor() {
    super();
  }
}
