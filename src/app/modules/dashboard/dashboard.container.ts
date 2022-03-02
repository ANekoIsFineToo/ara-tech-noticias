import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NewsQuery } from '@att/shared';

@Component({
  selector: 'att-dashboard',
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainer {
  readonly news$ = this.newsQuery.selectAll();
  readonly loading$ = this.newsQuery.selectLoading();

  constructor(private readonly newsQuery: NewsQuery) { }

  deleteNew(uuid: string): void {

  }
}
