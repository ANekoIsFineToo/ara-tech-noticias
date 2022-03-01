import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ProtocolInterceptor } from './interceptors';

@NgModule({
  imports: [
    // Angular
    HttpClientModule,
  ],
  providers: [
    // this HTTP interceptor should be always the last to avoid race conditions
    { provide: HTTP_INTERCEPTORS, useClass: ProtocolInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule?: CoreModule) {
    if (coreModule != null) {
      throw new Error('CoreModule can only be imported once in the application lifetime');
    }
  }
}
