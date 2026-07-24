import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { ResponsiveService } from '@core/services/responsive.service';
import { SidebarService } from '@core/services/sidebar.service';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly currentUser$: Observable<User | null>;
  readonly isMobile$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly responsiveService: ResponsiveService,
    private readonly sidebarService: SidebarService,
    private readonly router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isMobile$ = this.responsiveService.isMobile$;
  }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
