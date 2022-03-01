import { NgModule } from '@angular/core';

import { SharedModule } from '@att/shared';

import { HeaderComponent } from './components';
import { PublicContainer } from './public.container';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [
    // Containers
    PublicContainer,

    // Components
    HeaderComponent,
  ],
  imports: [
    // Shared module
    SharedModule,

    // Routing
    PublicRoutingModule,
  ],
})
export class PublicModule { }
