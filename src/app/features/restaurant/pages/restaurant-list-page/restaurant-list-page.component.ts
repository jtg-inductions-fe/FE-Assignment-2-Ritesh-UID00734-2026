import { Component, OnInit } from '@angular/core';

import { Restaurant } from '@core/models/restaurant.model';

import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-list-page',
  templateUrl: './restaurant-list-page.component.html',
  styleUrls: ['./restaurant-list-page.component.scss'],
})
export class RestaurantListPageComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private readonly restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  private loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
  }
}
