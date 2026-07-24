import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '@core/guards/auth.guard';
import { loginGuard } from '@core/guards/login.guard';
import { MainLayoutComponent } from '@shared/layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    canActivate: [loginGuard],
    loadChildren: () =>
      import('@features/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@features/dashboard/dashboard.module').then(
            m => m.DashboardModule
          ),
      },
      {
        path: 'restaurant',
        loadChildren: () =>
          import('@features/restaurant/restaurant.module').then(
            m => m.RestaurantModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('@features/error-pages/error-pages.module').then(
            m => m.ErrorPagesModule
          ),
      },
    ],
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
