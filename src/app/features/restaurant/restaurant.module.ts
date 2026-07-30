import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantListPageComponent } from './pages/restaurant-list-page/restaurant-list-page.component';
import { AddRestaurantPageComponent } from './pages/add-restaurant-page/add-restaurant-page.component';
import { EditRestaurantPageComponent } from './pages/edit-restaurant-page/edit-restaurant-page.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';

@NgModule({
  declarations: [
    RestaurantListPageComponent,
    AddRestaurantPageComponent,
    EditRestaurantPageComponent,
    RestaurantFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RestaurantRoutingModule,
    ReactiveFormsModule,
  ],
})
export class RestaurantModule {}
