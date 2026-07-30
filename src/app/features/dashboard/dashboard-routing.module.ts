import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Permission } from '@app/core/authorization/permission.model';
import { PermissionGuard } from '@core/authorization/permission.guard';

import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    canActivate: [PermissionGuard],
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
