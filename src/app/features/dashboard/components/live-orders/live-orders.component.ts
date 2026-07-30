import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RestaurantSelectionService } from '@features/dashboard/services/restaurant-selection.service';
import { DashboardService } from '@features/dashboard/services/dashboard.service';
import { LiveOrder } from '@core/models/live-order.model';
import { OrderStatus } from '@app/core/models/order-status.model';

@Component({
  selector: 'app-live-orders',
  templateUrl: './live-orders.component.html',
  styleUrls: ['./live-orders.component.scss'],
})
export class LiveOrdersComponent implements OnInit {
  readonly orderStatus = OrderStatus;
  liveOrders: LiveOrder[] = [];
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
        switchMap(restaurantId => this.loadLiveOrders(restaurantId)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: liveOrders => {
          this.liveOrders = liveOrders;
          this.loading = false;
        },
        error: () => {
          this.liveOrders = [];
          this.loading = false;
          this.error = true;
        },
      });
  }

  private loadLiveOrders(
    restaurantId: number | 'all'
  ): Observable<LiveOrder[]> {
    this.loading = true;
    this.error = false;

    return this.dashboardService.getLiveOrders(restaurantId);
  }

  acceptOrder(orderId: number): void {
    const order = this.findOrder(orderId);

    if (!order) {
      return;
    }

    order.status = OrderStatus.Preparing;
  }

  completeOrder(orderId: number): void {
    this.liveOrders = this.liveOrders.filter(order => order.id !== orderId);
  }

  rejectOrder(orderId: number): void {
    this.liveOrders = this.liveOrders.filter(order => order.id !== orderId);
  }

  isPending(order: LiveOrder): boolean {
    return order.status === OrderStatus.Pending;
  }

  isPreparing(order: LiveOrder): boolean {
    return order.status === OrderStatus.Preparing;
  }

  private findOrder(orderId: number): LiveOrder | undefined {
    return this.liveOrders.find(order => order.id === orderId);
  }
}
