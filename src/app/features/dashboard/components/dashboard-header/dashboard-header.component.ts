import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Restaurant } from '@core/models/restaurant.model';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent implements OnChanges {
  @Input() title = '';
  @Input() description = '';
  @Input() restaurants: Restaurant[] = [];
  @Input() selectedRestaurantId: number | 'all' = 'all';
  @Input() showRestaurantSelector = false;
  @Output() restaurantChanged = new EventEmitter<number | 'all'>();
  searchText = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRestaurantId'] || changes['restaurants']) {
      this.updateSearchText();
    }
  }

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

  displayRestaurant = (restaurant: Restaurant | string | null): string => {
    if (!restaurant) {
      return '';
    }
    if (typeof restaurant === 'string') {
      return restaurant;
    }
    return restaurant.name;
  };

  private updateSearchText(): void {
    if (this.selectedRestaurantId === 'all') {
      this.searchText = 'All Restaurants';
      return;
    }
    const restaurant = this.restaurants.find(
      restaurant => restaurant.id === this.selectedRestaurantId
    );
    this.searchText = restaurant?.name ?? '';
  }
}
