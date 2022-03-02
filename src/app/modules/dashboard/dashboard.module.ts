import { NgModule } from '@angular/core';

import { SharedModule } from '@att/shared';

import { NewsTableComponent } from './components';
import { NewsAddContainer, NewsEditContainer } from './containers';
import { NewsFormDialog } from './dialogs';
import { DashboardContainer } from './dashboard.container';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    // Containers
    DashboardContainer,
    NewsAddContainer,
    NewsEditContainer,

    // Components
    NewsTableComponent,

    // Dialogs
    NewsFormDialog,
  ],
  imports: [
    // Shared module
    SharedModule,

    // Routing
    DashboardRoutingModule,
  ],
})
export class DashboardModule { }
