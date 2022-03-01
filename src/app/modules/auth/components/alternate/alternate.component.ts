import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'att-auth-alternate',
  templateUrl: './alternate.component.html',
  styleUrls: ['./alternate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlternateComponent {
  @Input() loading?: boolean | null;

  @HostBinding('class.att-auth-alternate') readonly defaultClass = true;
}
