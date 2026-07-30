import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDrawerMode } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';

import { ResponsiveService } from '@core/services/responsive.service';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  mode: MatDrawerMode = 'side';
  opened = true;
  isMobile = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly responsiveService: ResponsiveService,
    private readonly sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.responsiveService.isMobile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isMobile => {
        this.isMobile = isMobile;

        if (isMobile) {
          this.mode = 'over';
          this.opened = false;
        } else {
          this.mode = 'side';
          this.opened = true;
        }
      });

    this.sidebarService.opened$
      .pipe(takeUntil(this.destroy$))
      .subscribe(opened => {
        if (this.isMobile) {
          this.opened = opened;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
