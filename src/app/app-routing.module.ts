import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { roleGuard } from '@core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'admin',
    },
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule),
  },

  {
    path: 'owner',
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'owner',
    },
    loadChildren: () =>
      import('./features/owner/owner.module').then(m => m.OwnerModule),
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
