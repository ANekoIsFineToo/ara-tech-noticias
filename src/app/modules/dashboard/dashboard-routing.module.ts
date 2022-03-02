import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewResolver, NewsResolver } from '@att/shared';

import { NewsAddContainer, NewsEditContainer } from './containers';
import { DashboardContainer } from './dashboard.container';

const routes: Routes = [
  {
    path: '',
    resolve: { news: NewsResolver },
    component: DashboardContainer,
    children: [
      {
        path: 'news',
        children: [
          { path: 'add', component: NewsAddContainer },
          { path: ':newUuid/edit', component: NewsEditContainer, resolve: { new: NewResolver } },
        ],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
