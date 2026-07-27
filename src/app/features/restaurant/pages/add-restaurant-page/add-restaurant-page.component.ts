import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Restaurant } from '@core/models/restaurant.model';

import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant-page',
  templateUrl: './add-restaurant-page.component.html',
  styleUrls: ['./add-restaurant-page.component.scss'],
})
export class AddRestaurantPageComponent {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly router: Router
  ) {}

  onSave(restaurant: Restaurant): void {
    this.restaurantService.addRestaurant(restaurant);

    this.router.navigate(['/restaurant']);
  }

  onCancel(): void {
    this.router.navigate(['/restaurant']);
  }
}
