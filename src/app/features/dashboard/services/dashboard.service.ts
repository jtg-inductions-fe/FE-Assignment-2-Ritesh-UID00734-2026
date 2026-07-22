import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { DashboardKpiApi } from '@core/models/dashboard-kpi-api.model';
import { DashboardKpi } from '@core/models/dashboard-kpi.model';
import { LiveOrder } from '@core/models/live-order.model';
import { Restaurant } from '@core/models/restaurant.model';
import { TopCustomer } from '@core/models/top-customer.model';
import { TopSellingDish } from '@core/models/top-selling-dish.model';

import { DASHBOARD_KPI_CONFIG } from '../config/dashboard-kpi.config';

interface RestaurantData<T> {
  all: T[];
  [key: string]: T[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly BASE_URL = 'assets/data/dashboard';

  constructor(private readonly http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.BASE_URL}/restaurants.json`);
  }

  getKpis(restaurantId: number | 'all'): Observable<DashboardKpi[]> {
    return this.http
      .get<Record<string, DashboardKpiApi[]>>(`${this.BASE_URL}/kpis.json`)
      .pipe(
        map(response => response[restaurantId]),
        map(kpis =>
          kpis.map(kpi => ({
            ...kpi,
            ...DASHBOARD_KPI_CONFIG[kpi.id],
          }))
        )
      );
  }

  getTopCustomers(restaurantId: number | 'all'): Observable<TopCustomer[]> {
    return this.http
      .get<RestaurantData<TopCustomer>>(`${this.BASE_URL}/top-customers.json`)
      .pipe(map(data => data[String(restaurantId)]));
  }

  getTopSellingDishes(
    restaurantId: number | 'all'
  ): Observable<TopSellingDish[]> {
    return this.http
      .get<RestaurantData<TopSellingDish>>(
        `${this.BASE_URL}/top-selling-dishes.json`
      )
      .pipe(map(data => data[String(restaurantId)]));
  }

  getLiveOrders(restaurantId: number | 'all'): Observable<LiveOrder[]> {
    return this.http
      .get<RestaurantData<LiveOrder>>(`${this.BASE_URL}/live-orders.json`)
      .pipe(map(data => data[String(restaurantId)]));
  }
}
