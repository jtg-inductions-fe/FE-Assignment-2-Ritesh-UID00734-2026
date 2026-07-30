import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Restaurant } from '@core/models/restaurant.model';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() restaurants: Restaurant[] = [];
  @Input() selectedRestaurantId: number | 'all' = 'all';
  @Input() showRestaurantSelector = false;
  @Output() restaurantChanged = new EventEmitter<number | 'all'>();
  searchText = 'All Restaurants';

  get filteredRestaurants(): Restaurant[] {
    const search = this.searchText.toLowerCase().trim();
    return this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(search)
    );
  }

  onSearch(value: string): void {
    this.searchText = value;
  }

  onRestaurantSelected(
    restaurant: Restaurant | 'all',
    isUserInput: boolean
  ): void {
    if (!isUserInput) {
      return;
    }
    if (restaurant === 'all') {
      this.searchText = 'All Restaurants';
      this.restaurantChanged.emit('all');
      return;
    }
    this.searchText = restaurant.name;
    this.restaurantChanged.emit(restaurant.id);
  }
}
