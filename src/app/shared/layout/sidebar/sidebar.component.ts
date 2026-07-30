import { Component } from '@angular/core';
import { SidebarConfig } from '@core/models/sidebar-config.model';
import { SidebarMenuService } from '@core/services/sidebar-menu.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  readonly sidebarConfig$: Observable<SidebarConfig>;

  constructor(private readonly sidebarMenuService: SidebarMenuService) {
    this.sidebarConfig$ = this.sidebarMenuService.getSidebarConfig();
  }
}
