import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Restaurant } from '@core/models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private readonly RESTAURANTS_URL = 'assets/data/restaurants.json';
  private readonly restaurantsSubject = new BehaviorSubject<Restaurant[]>([]);

  constructor(private readonly http: HttpClient) {
    this.loadRestaurants();
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.restaurantsSubject.asObservable();
  }

  getRestaurant(id: number): Observable<Restaurant | undefined> {
    return this.getRestaurants().pipe(
      map(restaurants => restaurants.find(restaurant => restaurant.id === id))
    );
  }

  addRestaurant(restaurant: Restaurant): void {
    const restaurants = this.restaurantsSubject.value;

    const nextId =
      restaurants.length === 0
        ? 1
        : Math.max(...restaurants.map(r => r.id)) + 1;

    this.restaurantsSubject.next([
      ...restaurants,
      {
        ...restaurant,
        id: nextId,
      },
    ]);
  }

  updateRestaurant(restaurant: Restaurant): void {
    const restaurants = this.restaurantsSubject.value;

    this.restaurantsSubject.next(
      restaurants.map(r => (r.id === restaurant.id ? restaurant : r))
    );
  }

  private loadRestaurants(): void {
    this.http.get<Restaurant[]>(this.RESTAURANTS_URL).subscribe(restaurants => {
      this.restaurantsSubject.next(restaurants);
    });
  }
}
