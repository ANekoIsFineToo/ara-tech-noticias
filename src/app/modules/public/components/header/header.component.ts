import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '@att/domain';

@Component({
  selector: 'att-public-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() user?: User | null;
  @Output() readonly turnUserToAdmin = new EventEmitter<void>();
  @Output() readonly logout = new EventEmitter<void>();
}
