import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsResolver } from '@att/shared';

import { DashboardContainer } from './dashboard.container';

const routes: Routes = [
  {
    path: '',
    resolve: { news: NewsResolver },
    component: DashboardContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
