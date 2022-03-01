import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicContainer } from './public.container';

const routes: Routes = [
  {
    path: '',
    component: PublicContainer,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule { }
