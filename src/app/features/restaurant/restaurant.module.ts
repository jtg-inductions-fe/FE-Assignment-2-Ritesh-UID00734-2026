import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantPageComponent } from './pages/restaurant-page/restaurant-page.component';

@NgModule({
  declarations: [RestaurantPageComponent],
  imports: [CommonModule, RestaurantRoutingModule],
})
export class RestaurantModule {}
