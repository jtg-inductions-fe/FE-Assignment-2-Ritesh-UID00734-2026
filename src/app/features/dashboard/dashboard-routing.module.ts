import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { Permission } from '@core/authorization/permission.enum';
import { permissionGuard } from '@core/authorization/permission.guard';

import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    canActivate: [authGuard, permissionGuard],
    data: {
      permission: Permission.VIEW_DASHBOARD,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
