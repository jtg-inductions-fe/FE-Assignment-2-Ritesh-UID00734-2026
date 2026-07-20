import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private readonly openedSubject = new BehaviorSubject<boolean>(false);

  readonly opened$ = this.openedSubject.asObservable();

  get opened(): boolean {
    return this.openedSubject.value;
  }

  toggle(): void {
    this.openedSubject.next(!this.opened);
  }

  open(): void {
    this.openedSubject.next(true);
  }

  close(): void {
    this.openedSubject.next(false);
  }
}
