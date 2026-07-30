import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardKpiCardComponent } from './components/dashboard-kpi-card/dashboard-kpi-card.component';
import { DashboardKpiGridComponent } from './components/dashboard-kpi-grid/dashboard-kpi-grid.component';
import { LiveOrdersComponent } from './components/live-orders/live-orders.component';
import { ReportGeneratorComponent } from './components/report-generator/report-generator.component';
import { TopCustomersComponent } from './components/top-customers/top-customers.component';
import { TopSellingDishesComponent } from './components/top-selling-dishes/top-selling-dishes.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardHeaderComponent,
    DashboardKpiCardComponent,
    DashboardKpiGridComponent,
    ReportGeneratorComponent,
    TopCustomersComponent,
    TopSellingDishesComponent,
    LiveOrdersComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
