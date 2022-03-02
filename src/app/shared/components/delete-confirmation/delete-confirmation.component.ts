import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'att-shared-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationComponent { }
