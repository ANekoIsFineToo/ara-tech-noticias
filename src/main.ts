import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableAkitaProdMode, persistState } from '@datorama/akita';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableAkitaProdMode()
  enableProdMode();
}

// persist akita state into local storage, this keeps the session available on refresh
const storage = persistState();
const providers = [{ provide: 'persistStorage', useValue: storage }];

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
