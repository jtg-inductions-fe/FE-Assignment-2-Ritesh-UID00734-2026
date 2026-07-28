import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly restaurantSelectionService: RestaurantSelectionService
  ) {}

  ngOnInit(): void {
    this.restaurantSelectionService.selectedRestaurantId$
      .pipe(
        switchMap(restaurantId => this.loadTopCustomers(restaurantId)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
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

  private loadTopCustomers(
    restaurantId: number | 'all'
  ): Observable<TopCustomer[]> {
    this.loading = true;
    this.error = false;

    return this.dashboardService.getTopCustomers(restaurantId);
  }
}
