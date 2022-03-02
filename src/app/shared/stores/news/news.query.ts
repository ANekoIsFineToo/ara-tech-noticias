import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { NewsState } from '../../interfaces';
import { NewsStore } from './news.store';

@Injectable({ providedIn: 'root' })
export class NewsQuery extends QueryEntity<NewsState> {
  constructor(store: NewsStore) {
    super(store);
  }
}
