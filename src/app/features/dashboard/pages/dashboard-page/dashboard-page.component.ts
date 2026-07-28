import { Component, OnInit } from '@angular/core';

import { Permission } from '@app/core/authorization/permission.model';
import { PermissionService } from '@core/authorization/permission.service';
import { AuthService } from '@core/services/auth.service';
import { Restaurant } from '@core/models/restaurant.model';
import { User } from '@core/models/user.model';

import { DashboardService } from '../../services/dashboard.service';
import { RestaurantSelectionService } from '../../services/restaurant-selection.service';
import {
  DASHBOARD_PAGE_CONFIG,
  DashboardConfig,
} from '../../config/dashboard-page.config';

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
    protected readonly permissionService: PermissionService
  ) {
    this.currentUser = this.authService.getCurrentUser();

    this.selectedRestaurantId = this.permissionService.hasPermission(
      Permission.VIEW_RESTAURANTS
    )
      ? 'all'
      : (this.currentUser?.restaurantId ?? 'all');
  }

  ngOnInit(): void {
    this.restaurantSelectionService.selectRestaurant(this.selectedRestaurantId);
    this.loadRestaurants();
  }

  get pageConfig(): DashboardConfig {
    return this.permissionService.hasPermission(Permission.VIEW_RESTAURANTS)
      ? DASHBOARD_PAGE_CONFIG.admin
      : DASHBOARD_PAGE_CONFIG.owner;
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
