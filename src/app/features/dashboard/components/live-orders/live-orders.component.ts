import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { switchMap } from 'rxjs/operators';

import { DashboardService } from '../../services/dashboard.service';
import { RestaurantSelectionService } from '../../services/restaurant-selection.service';

import { LiveOrder } from '@core/models/live-order.model';
import { OrderStatus } from '@core/models/order-status.enum';

@Component({
  selector: 'app-live-orders',
  templateUrl: './live-orders.component.html',
  styleUrls: ['./live-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveOrdersComponent implements OnInit {
  readonly orderStatus = OrderStatus;

  liveOrders: LiveOrder[] = [];

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly restaurantSelectionService: RestaurantSelectionService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.restaurantSelectionService.selectedRestaurantId$
      .pipe(
        switchMap(restaurantId =>
          this.dashboardService.getLiveOrders(restaurantId)
        )
      )
      .subscribe(liveOrders => {
        this.liveOrders = liveOrders.map(order => ({
          ...order,
        }));

        this.cdr.markForCheck();
      });
  }

  acceptOrder(orderId: number): void {
    const order = this.findOrder(orderId);

    if (!order) {
      return;
    }

    order.status = OrderStatus.Preparing;

    this.cdr.markForCheck();
  }

  completeOrder(orderId: number): void {
    this.liveOrders = this.liveOrders.filter(order => order.id !== orderId);

    this.cdr.markForCheck();
  }

  rejectOrder(orderId: number): void {
    this.liveOrders = this.liveOrders.filter(order => order.id !== orderId);

    this.cdr.markForCheck();
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
