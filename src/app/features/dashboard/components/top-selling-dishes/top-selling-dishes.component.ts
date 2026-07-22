import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DashboardService } from '../../services/dashboard.service';
import { RestaurantSelectionService } from '../../services/restaurant-selection.service';

import { TopSellingDish } from '@core/models/top-selling-dish.model';

@Component({
  selector: 'app-top-selling-dishes',
  templateUrl: './top-selling-dishes.component.html',
  styleUrls: ['./top-selling-dishes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopSellingDishesComponent implements OnInit {
  dishes$!: Observable<TopSellingDish[]>;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly restaurantSelectionService: RestaurantSelectionService
  ) {}

  ngOnInit(): void {
    this.dishes$ = this.restaurantSelectionService.selectedRestaurantId$.pipe(
      switchMap(restaurantId =>
        this.dashboardService.getTopSellingDishes(restaurantId)
      )
    );
  }
}
