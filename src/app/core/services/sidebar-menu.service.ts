import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';
import { PermissionService } from '@core/authorization/permission.service';
import { SidebarConfig } from '@core/models/sidebar-config.model';
import { SidebarItem } from '@core/models/sidebar-item.model';

@Injectable({
  providedIn: 'root',
})
export class SidebarMenuService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly permissionService: PermissionService
  ) {}

  getSidebarConfig(): Observable<SidebarConfig> {
    return this.authService.currentUser$.pipe(
      switchMap(() => this.http.get<SidebarConfig>('assets/data/sidebar.json')),
      map(config => ({
        primary: this.filterItems(config.primary),
        secondary: this.filterItems(config.secondary),
        footer: this.filterItems(config.footer),
      }))
    );
  }

  private filterItems(items: SidebarItem[]): SidebarItem[] {
    return items
      .map(item => this.filterItem(item))
      .filter((item): item is SidebarItem => item !== null);
  }

  private filterItem(item: SidebarItem): SidebarItem | null {
    if (
      item.permission &&
      !this.permissionService.hasPermission(item.permission)
    ) {
      return null;
    }

    if (!item.children?.length) {
      return item;
    }

    const children = this.filterItems(item.children);

    if (!children.length) {
      return null;
    }

    return {
      ...item,
      children,
    };
  }
}
