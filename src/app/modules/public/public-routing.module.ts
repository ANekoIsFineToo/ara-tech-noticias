import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleGuard } from '@att/core';
import { Role } from '@att/domain';
import { NewsResolver } from '@att/shared';

import { NewsContainer } from './containers';
import { PublicContainer } from './public.container';

const routes: Routes = [
  {
    path: '',
    component: PublicContainer,
    children: [
      {
        path: '',
        pathMatch: 'full',
        resolve: { news: NewsResolver },
        component: NewsContainer,
      },
      {
        path: 'dashboard',
        canActivate: [RoleGuard],
        data: { roles: [Role.ADMIN_ROLE] },
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule { }
