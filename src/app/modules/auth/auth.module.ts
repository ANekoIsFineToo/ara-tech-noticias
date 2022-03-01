import { NgModule } from '@angular/core';

import { SharedModule } from '@att/shared';

import { AlternateComponent, FormComponent } from './components';
import { AuthContainer } from './auth.container';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    // Containers
    AuthContainer,

    // Components
    AlternateComponent,
    FormComponent,
  ],
  imports: [
    // Shared module
    SharedModule,

    // Routing
    AuthRoutingModule,
  ],
})
export class AuthModule { }
