import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthContainer } from './auth.container';

const routes: Routes = [
  {
    // only /sign-in or /sign-up are valid routes to authenticate
    matcher: (url) => url.length === 1 && ['sign-in', 'sign-up'].includes(url[0].path) ? ({ consumed: url }) : null,
    component: AuthContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
