import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DashboardService } from '@features/dashboard/services/dashboard.service';
import { RestaurantSelectionService } from '@features/dashboard/services/restaurant-selection.service';
import { DashboardKpi } from '@core/models/dashboard-kpi.model';

@Component({
  selector: 'app-dashboard-kpi-grid',
  templateUrl: './dashboard-kpi-grid.component.html',
  styleUrls: ['./dashboard-kpi-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardKpiGridComponent implements OnInit {
  kpis$!: Observable<DashboardKpi[]>;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly restaurantSelectionService: RestaurantSelectionService
  ) {}

  ngOnInit(): void {
    this.kpis$ = this.restaurantSelectionService.selectedRestaurantId$.pipe(
      switchMap(restaurantId => this.dashboardService.getKpis(restaurantId))
    );
  }
}
