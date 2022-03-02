import { NgModule } from '@angular/core';

import { SharedModule } from '@att/shared';

import { HeaderComponent } from './components';
import { NewsContainer } from './containers';
import { PublicContainer } from './public.container';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [
    // Containers
    PublicContainer,
    NewsContainer,

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
