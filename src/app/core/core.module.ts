import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  imports: [],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule?: CoreModule) {
    if (coreModule != null) {
      throw new Error('CoreModule can only be imported once in the application lifetime');
    }
  }
}
