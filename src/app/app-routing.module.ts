import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@att/core';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
