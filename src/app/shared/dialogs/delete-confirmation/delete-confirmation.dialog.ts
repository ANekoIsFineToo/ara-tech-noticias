import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'att-shared-delete-confirmation',
  templateUrl: './delete-confirmation.dialog.html',
  styleUrls: ['./delete-confirmation.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationDialog { }
