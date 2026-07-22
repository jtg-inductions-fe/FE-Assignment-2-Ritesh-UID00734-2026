import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantSelectionService {
  private readonly selectedRestaurantIdSubject = new BehaviorSubject<
    number | 'all'
  >('all');

  readonly selectedRestaurantId$: Observable<number | 'all'> =
    this.selectedRestaurantIdSubject.asObservable();

  selectRestaurant(restaurantId: number | 'all'): void {
    this.selectedRestaurantIdSubject.next(restaurantId);
  }

  getSelectedRestaurant(): number | 'all' {
    return this.selectedRestaurantIdSubject.value;
  }
}
