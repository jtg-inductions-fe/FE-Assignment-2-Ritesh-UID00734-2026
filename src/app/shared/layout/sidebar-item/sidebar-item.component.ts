import { Component, Input } from '@angular/core';

import { ResponsiveService } from '@core/services/responsive.service';
import { SidebarService } from '@core/services/sidebar.service';
import { SidebarItem } from '@core/models/sidebar-item.model';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent {
  @Input({ required: true })
  item!: SidebarItem;
  expanded = false;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly responsiveService: ResponsiveService
  ) {}

  get hasChildren(): boolean {
    return !!this.item.children?.length;
  }

  toggle(): void {
    if (this.hasChildren) {
      this.expanded = !this.expanded;
    }
  }

  onItemClick(): void {
    if (this.responsiveService.isMobile) {
      this.sidebarService.close();
    }
  }
}
