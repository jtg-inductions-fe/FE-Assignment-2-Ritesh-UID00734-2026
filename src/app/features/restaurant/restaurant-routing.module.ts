import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Permission } from '@core/authorization/permission.model';
import { permissionGuard } from '@core/authorization/permission.guard';

import { RestaurantListPageComponent } from './pages/restaurant-list-page/restaurant-list-page.component';
import { AddRestaurantPageComponent } from './pages/add-restaurant-page/add-restaurant-page.component';
import { EditRestaurantPageComponent } from './pages/edit-restaurant-page/edit-restaurant-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [permissionGuard],
    data: {
      permission: Permission.VIEW_RESTAURANTS,
    },
    component: RestaurantListPageComponent,
  },
  {
    path: 'add',
    canActivate: [permissionGuard],
    data: {
      permission: Permission.CREATE_RESTAURANT,
    },
    component: AddRestaurantPageComponent,
  },
  {
    path: ':id/edit',
    canActivate: [permissionGuard],
    data: {
      permission: Permission.EDIT_RESTAURANT,
    },
    component: EditRestaurantPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
