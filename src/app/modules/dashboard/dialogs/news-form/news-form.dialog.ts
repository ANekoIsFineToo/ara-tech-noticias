import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { New } from '@att/domain';
import { NewsQuery } from '@att/shared';

export interface NewsFormDialogData {
  readonly mode: 'create' | 'update';
}

@Component({
  selector: 'att-dashboard-news-form',
  templateUrl: './news-form.dialog.html',
  styleUrls: ['./news-form.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFormDialog implements OnInit, OnDestroy {
  get mode(): NewsFormDialogData['mode'] {
    return this.data.mode;
  }

  readonly form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly newsQuery: NewsQuery,
    private readonly dialogRef: MatDialogRef<NewsFormDialog, Omit<New, 'uuid'> | undefined>,
    @Inject(MAT_DIALOG_DATA) private readonly data: NewsFormDialogData,
  ) { }

  ngOnInit(): void {
    if (this.data.mode === 'update') {
      this.newsQuery.selectActive().pipe(takeUntil(this.unsubscribe$)).subscribe((activeNew) =>
        this.form.patchValue({ title: activeNew?.title, description: activeNew?.description }));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }
}
