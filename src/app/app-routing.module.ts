import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () =>
      import('@features/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('@features/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },

  {
    path: 'restaurant',
    canActivate: [authGuard],
    loadChildren: () =>
      import('@features/restaurant/restaurant.module').then(
        m => m.RestaurantModule
      ),
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
