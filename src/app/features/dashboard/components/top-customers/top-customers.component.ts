import { Component, OnInit } from '@angular/core';

import { TopCustomer } from '@core/models/top-customer.model';

import { DashboardService } from '../../services/dashboard.service';
import { RestaurantSelectionService } from '../../services/restaurant-selection.service';

@Component({
  selector: 'app-top-customers',
  templateUrl: './top-customers.component.html',
  styleUrls: ['./top-customers.component.scss'],
})
export class TopCustomersComponent implements OnInit {
  customers: TopCustomer[] = [];
  loading = true;
  error = false;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly restaurantSelectionService: RestaurantSelectionService
  ) {}

  ngOnInit(): void {
    this.restaurantSelectionService.selectedRestaurantId$.subscribe(
      restaurantId => {
        this.loadTopCustomers(restaurantId);
      }
    );
  }

  private loadTopCustomers(restaurantId: number | 'all'): void {
    this.loading = true;
    this.error = false;

    this.dashboardService.getTopCustomers(restaurantId).subscribe({
      next: customers => {
        this.customers = customers;
        this.loading = false;
      },
      error: () => {
        this.customers = [];
        this.loading = false;
        this.error = true;
      },
    });
  }
}
