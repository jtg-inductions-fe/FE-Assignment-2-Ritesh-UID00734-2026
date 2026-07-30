import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import { LoginGuard } from '@core/guards/login.guard';
import { ROUTES } from '@core/constants/routes.constants';
import { MainLayoutComponent } from '@shared/layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: ROUTES.ROOT,
    redirectTo: ROUTES.LOGIN,
    pathMatch: 'full',
  },
  {
    path: ROUTES.LOGIN,
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('@features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: ROUTES.ROOT,
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ROUTES.DASHBOARD,
        loadChildren: () =>
          import('@features/dashboard/dashboard.module').then(
            m => m.DashboardModule
          ),
      },
      {
        path: ROUTES.RESTAURANT,
        loadChildren: () =>
          import('@features/restaurant/restaurant.module').then(
            m => m.RestaurantModule
          ),
      },
      {
        path: ROUTES.ROOT,
        loadChildren: () =>
          import('@features/error-pages/error-pages.module').then(
            m => m.ErrorPagesModule
          ),
      },
    ],
  },
  {
    path: ROUTES.WILDCARD,
    redirectTo: ROUTES.LOGIN,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
