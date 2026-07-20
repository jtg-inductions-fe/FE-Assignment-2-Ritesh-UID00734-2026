import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  readonly isMobile$: Observable<boolean>;

  private mobile = false;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver
      .observe('(max-width: 1023px)')
      .pipe(map(result => result.matches));

    this.isMobile$.subscribe(isMobile => {
      this.mobile = isMobile;
    });
  }

  get isMobile(): boolean {
    return this.mobile;
  }
}
