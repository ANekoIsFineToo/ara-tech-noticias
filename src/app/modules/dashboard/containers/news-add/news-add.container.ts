import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { New } from '@att/domain';
import { NewsService } from '@att/shared';

import { NewsFormDialog } from '../../dialogs';

@Component({
  selector: 'att-dashboard-news-add',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsAddContainer implements OnInit {
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
      ariaLabel: $localize`:@@dashboardNewsAddFormDialogLabel:Crear una nueva noticia`,
      data: { mode: 'create' },
    });

    ref.backdropClick().subscribe(() => ref.close(undefined));
    ref.afterClosed().subscribe((result: Omit<New, 'uuid'> | undefined) => {
      if (result != null) {
        const message = $localize`:@@dashboardNewsAddCreated:La noticia ha sido creada`;
        const { title, description } = result;
        this.newsService.create(title, description).subscribe(() => this.matSnackBar.open(message));
      }

      this.router.navigate(['../..'], { relativeTo: this.route });
    });
  }
}
