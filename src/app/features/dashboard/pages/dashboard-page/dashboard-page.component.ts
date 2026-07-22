import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services/auth.service';

import { DashboardService } from '../../services/dashboard.service';
import { RestaurantSelectionService } from '../../services/restaurant-selection.service';

import { Permission } from '@core/authorization/permission.enum';
import { PermissionService } from '@core/authorization/permission.service';

import { User } from '@core/models/user.model';
import { Restaurant } from '@core/models/restaurant.model';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  readonly currentUser: User | null;

  readonly permission = Permission;

  selectedRestaurantId: number | 'all';

  restaurants: Restaurant[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly dashboardService: DashboardService,
    private readonly restaurantSelectionService: RestaurantSelectionService,
    public readonly permissionService: PermissionService
  ) {
    this.currentUser = this.authService.getCurrentUser();

    this.selectedRestaurantId =
      this.currentUser?.role === 'admin'
        ? 'all'
        : (this.currentUser?.restaurantId ?? 'all');
  }

  ngOnInit(): void {
    this.restaurantSelectionService.selectRestaurant(this.selectedRestaurantId);

    this.loadRestaurants();
  }

  onRestaurantChange(restaurantId: number | 'all'): void {
    this.selectedRestaurantId = restaurantId;

    this.restaurantSelectionService.selectRestaurant(restaurantId);
  }

  private loadRestaurants(): void {
    this.dashboardService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
  }
}
