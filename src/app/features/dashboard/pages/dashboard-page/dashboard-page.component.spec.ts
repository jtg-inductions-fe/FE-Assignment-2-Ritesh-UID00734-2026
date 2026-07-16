import { Component } from '@angular/core';

import { Permission } from '@core/authorization/permission.enum';
import { User } from '@core/models/user.model';
import { AuthService } from '@core/services/auth.service';
import { PermissionService } from '@core/authorization/permission.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  readonly currentUser: User | null;

  readonly Permission = Permission;

  constructor(
    private readonly authService: AuthService,
    public readonly permissionService: PermissionService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }
}
