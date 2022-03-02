import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, mergeMap } from 'rxjs';

import { DeleteConfirmationComponent, NewsQuery, NewsService } from '@att/shared';

@Component({
  selector: 'att-dashboard',
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainer {
  readonly news$ = this.newsQuery.selectAll();
  readonly loading$ = this.newsQuery.selectLoading();

  constructor(
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly newsService: NewsService,
    private readonly newsQuery: NewsQuery,
  ) { }

  deleteNew(uuid: string): void {
    const ref = this.matDialog.open(DeleteConfirmationComponent, {
      role: 'alertdialog',
      ariaLabel: $localize`:@@dashboardRootDeleteNewConfirmationLabel:Confirmar la eliminación de una noticia`,
    });

    ref.afterClosed().pipe(mergeMap((confirmed) => confirmed ? this.newsService.delete(uuid) : EMPTY)).subscribe(() => {
      const message = $localize`:@@dashboardRootDeleteConfirmationSuccess:La noticia ha sido eliminada`;
      this.matSnackBar.open(message, undefined, {
        politeness: 'polite',
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 3000,
      })
    });
  }
}
