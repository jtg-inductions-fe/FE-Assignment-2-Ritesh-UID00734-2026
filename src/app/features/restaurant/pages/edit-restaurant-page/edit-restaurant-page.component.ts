import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { RestaurantService } from '../../services/restaurant.service';

import { Restaurant } from '@core/models/restaurant.model';

@Component({
  selector: 'app-edit-restaurant-page',
  templateUrl: './edit-restaurant-page.component.html',
  styleUrls: ['./edit-restaurant-page.component.scss'],
})
export class EditRestaurantPageComponent implements OnInit {
  restaurant?: Restaurant;

  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.restaurantService.getRestaurant(id).subscribe(restaurant => {
      if (!restaurant) {
        this.router.navigate(['/restaurant']);
        return;
      }

      this.restaurant = restaurant;
    });
  }

  onSave(restaurant: Restaurant): void {
    this.restaurantService.updateRestaurant(restaurant);

    this.router.navigate(['/restaurant']);
  }

  onCancel(): void {
    this.router.navigate(['/restaurant']);
  }
}
