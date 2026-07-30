import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Permission } from '@core/authorization/permission.model';
import { PermissionGuard } from '@core/authorization/permission.guard';
import { ROUTES } from '@core/constants/routes.constants';

import { AddRestaurantPageComponent } from './pages/add-restaurant-page/add-restaurant-page.component';
import { EditRestaurantPageComponent } from './pages/edit-restaurant-page/edit-restaurant-page.component';
import { RestaurantListPageComponent } from './pages/restaurant-list-page/restaurant-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantListPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: Permission.VIEW_RESTAURANTS,
    },
  },
  {
    path: ROUTES.RESTAURANT_ADD,
    component: AddRestaurantPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: Permission.CREATE_RESTAURANT,
    },
  },
  {
    path: ROUTES.RESTAURANT_EDIT,
    component: EditRestaurantPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: Permission.EDIT_RESTAURANT,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
