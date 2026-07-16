import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Permission } from '@core/authorization/permission.enum';
import { permissionGuard } from '@core/authorization/permission.guard';
import { RestaurantPageComponent } from './pages/restaurant-page/restaurant-page.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantPageComponent,
    canActivate: [permissionGuard],
    data: {
      permission: Permission.VIEW_RESTAURANTS,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
