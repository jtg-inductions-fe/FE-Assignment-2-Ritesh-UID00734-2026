import { Component, OnInit } from '@angular/core';

import { TopSellingDish } from '@core/models/top-selling-dish.model';

import { DashboardService } from '../../services/dashboard.service';
import { RestaurantSelectionService } from '../../services/restaurant-selection.service';

@Component({
  selector: 'app-top-selling-dishes',
  templateUrl: './top-selling-dishes.component.html',
  styleUrls: ['./top-selling-dishes.component.scss'],
})
export class TopSellingDishesComponent implements OnInit {
  dishes: TopSellingDish[] = [];

  loading = true;

  error = false;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly restaurantSelectionService: RestaurantSelectionService
  ) {}

  ngOnInit(): void {
    this.restaurantSelectionService.selectedRestaurantId$.subscribe(
      restaurantId => {
        this.loadTopSellingDishes(restaurantId);
      }
    );
  }

  private loadTopSellingDishes(restaurantId: number | 'all'): void {
    this.loading = true;
    this.error = false;

    this.dashboardService.getTopSellingDishes(restaurantId).subscribe({
      next: dishes => {
        this.dishes = dishes;
        this.loading = false;
      },
      error: () => {
        this.dishes = [];
        this.loading = false;
        this.error = true;
      },
    });
  }
}
