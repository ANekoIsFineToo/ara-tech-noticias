import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';

import { ProtocolInterceptor, TokenInterceptor } from './interceptors';

const MAT_SNACKBAR_CONFIG: MatSnackBarConfig<void> = {
  politeness: 'polite',
  duration: 3000,
  horizontalPosition: 'start',
  verticalPosition: 'bottom',
};

@NgModule({
  imports: [
    // Angular
    HttpClientModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACKBAR_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
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
