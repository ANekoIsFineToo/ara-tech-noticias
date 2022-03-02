import { Injectable } from '@angular/core';
import { setLoading } from '@datorama/akita';
import { v4 as uuidv4 } from 'uuid';
import { EMPTY, map, Observable, of, tap, throwError } from 'rxjs';

import { NewsHttpService } from '@att/core';
import { New } from '@att/domain';

import { NewsQuery } from './news.query';
import { NewsStore } from './news.store';

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(
    private readonly newsStore: NewsStore,
    private readonly newsQuery: NewsQuery,
    private readonly newsHttpService: NewsHttpService,
  ) { }

  list(): Observable<New[]> {
    return this.newsHttpService.list().pipe(
      setLoading(this.newsStore),
      map(response => response.news),
      tap(news => this.newsStore.set(news)),
    );
  }

  get(uuid: string): Observable<New> {
    const found = this.newsQuery.getEntity(uuid);
    if (found != null) {
      this.newsStore.setActive(uuid);
      return of(found);
    }

    return EMPTY;
  }

  create(title: string, description: string): Observable<New> {
    const uuid = uuidv4();
    return this.newsHttpService.create({ newsUuid: uuid, title, description }).pipe(
      setLoading(this.newsStore),
      map(response => response.news),
      tap(entity => this.newsStore.add(entity)),
    );
  }

  update(title: string, description: string): Observable<New> {
    const uuid = this.newsStore.getValue().active;
    if (uuid == null) {
      return throwError(() => new Error('A new entity must be active to perform an update'));
    }

    return this.newsHttpService.update({ uuid, new: { title, description } }).pipe(
      setLoading(this.newsStore),
      map(response => response.news),
      tap(({ title, description }) => this.newsStore.update(uuid, { title, description })),
    );
  }

  delete(uuid: string): Observable<string> {
    return this.newsHttpService.delete({ uuid }).pipe(
      setLoading(this.newsStore),
      map(response => response.uuid),
      tap(() => this.newsStore.remove(uuid)),
    );
  }
}
