import { ChangeDetectionStrategy, Component } from '@angular/core';

import { New } from '@att/domain';
import { NewsQuery } from '@att/shared';

@Component({
  selector: 'att-public-news',
  templateUrl: './news.container.html',
  styleUrls: ['./news.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsContainer {
  readonly news$ = this.newsQuery.selectAll();

  constructor(private readonly newsQuery: NewsQuery) { }

  trackByUuid(index: number, newEntity: New): string {
    return newEntity.uuid;
  }
}
