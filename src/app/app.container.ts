import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'att-root',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContainer { }
