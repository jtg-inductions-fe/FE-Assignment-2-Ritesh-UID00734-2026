import { Component, OnInit } from '@angular/core';

import { LiveOrder } from '@core/models/live-order.model';
import { OrderStatus } from '@app/core/models/order-status.model';

import { DashboardService } from '../../services/dashboard.service';
import { RestaurantSelectionService } from '../../services/restaurant-selection.service';

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

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly restaurantSelectionService: RestaurantSelectionService
  ) {}

  ngOnInit(): void {
    this.restaurantSelectionService.selectedRestaurantId$.subscribe(
      restaurantId => {
        this.loadLiveOrders(restaurantId);
      }
    );
  }

  private loadLiveOrders(restaurantId: number | 'all'): void {
    this.loading = true;
    this.error = false;

    this.dashboardService.getLiveOrders(restaurantId).subscribe({
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
