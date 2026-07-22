import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DashboardService } from '../../services/dashboard.service';
import { RestaurantSelectionService } from '../../services/restaurant-selection.service';

import { TopCustomer } from '@core/models/top-customer.model';

@Component({
  selector: 'app-top-customers',
  templateUrl: './top-customers.component.html',
  styleUrls: ['./top-customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopCustomersComponent implements OnInit {
  customers$!: Observable<TopCustomer[]>;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly restaurantSelectionService: RestaurantSelectionService
  ) {}

  ngOnInit(): void {
    this.customers$ =
      this.restaurantSelectionService.selectedRestaurantId$.pipe(
        switchMap(restaurantId =>
          this.dashboardService.getTopCustomers(restaurantId)
        )
      );
  }
}
