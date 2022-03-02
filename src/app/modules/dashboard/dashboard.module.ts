import { NgModule } from '@angular/core';

import { SharedModule } from '@att/shared';

import { NewsTableComponent } from './components';
import { DashboardContainer } from './dashboard.container';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    // Containers
    DashboardContainer,

    // Components
    NewsTableComponent,
  ],
  imports: [
    // Shared module
    SharedModule,

    // Routing
    DashboardRoutingModule,
  ],
})
export class DashboardModule { }
