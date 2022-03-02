import {
  AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { New } from '@att/domain';

@Component({
  selector: 'att-dashboard-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsTableComponent implements OnChanges, AfterViewInit {
  @Input() news?: New[] | null;
  @Input() loading?: boolean | null;
  @Output() readonly delete = new EventEmitter<string>();

  @HostBinding('class.att-dashboard-news-table') readonly defaultClass = true;

  @ViewChild(MatSort) matSort?: MatSort;
  @ViewChild(MatPaginator) matPaginator?: MatPaginator;

  readonly dataSource = new MatTableDataSource<New>();
  readonly displayedColumns = ['title', 'actions'];
  readonly pageSizeOptions = [5, 10, 25, 100];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['news'] != null) {
      this.dataSource.data = changes['news'].currentValue ?? [];
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort ?? null;
    this.dataSource.paginator = this.matPaginator ?? null;
  }
}
