import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DashboardService } from '@features/dashboard/services/dashboard.service';
import { RestaurantSelectionService } from '@features/dashboard/services/restaurant-selection.service';
import { TopSellingDish } from '@core/models/top-selling-dish.model';

@Component({
  selector: 'app-top-selling-dishes',
  templateUrl: './top-selling-dishes.component.html',
  styleUrls: ['./top-selling-dishes.component.scss'],
})
export class TopSellingDishesComponent implements OnInit {
  dishes: TopSellingDish[] = [];
  loading = true;
  error = false;
  showRestaurantName = true;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly restaurantSelectionService: RestaurantSelectionService
  ) {}

  ngOnInit(): void {
    this.restaurantSelectionService.selectedRestaurantId$
      .pipe(
        switchMap(restaurantId => {
          this.showRestaurantName = restaurantId === 'all';
          return this.loadTopSellingDishes(restaurantId);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
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

  private loadTopSellingDishes(
    restaurantId: number | 'all'
  ): Observable<TopSellingDish[]> {
    this.loading = true;
    this.error = false;

    return this.dashboardService.getTopSellingDishes(restaurantId);
  }
}
