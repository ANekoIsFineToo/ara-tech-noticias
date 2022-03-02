import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { New } from '@att/domain';
import {  NewsService } from '@att/shared';

import { NewsFormDialog } from '../../dialogs';

@Component({
  selector: 'att-dashboard-news-edit',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsEditContainer {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly newsService: NewsService,
  ) { }

  ngOnInit(): void {
    const ref = this.matDialog.open(NewsFormDialog, {
      role: 'dialog',
      disableClose: true,
      ariaLabel: $localize`:@@dashboardNewsEditFormDialogLabel:Editar una noticia`,
      data: { mode: 'update' },
    });

    ref.backdropClick().subscribe(() => ref.close(undefined));
    ref.afterClosed().subscribe((result: New | undefined) => {
      if (result != null) {
        const message = $localize`:@@dashboardNewsEditUpdate:La noticia ha sido editada`;
        const { title, description } = result;
        this.newsService.update(title, description).subscribe(() => this.matSnackBar.open(message));
      }

      this.router.navigate(['../../..'], { relativeTo: this.route });
    });
  }
}
