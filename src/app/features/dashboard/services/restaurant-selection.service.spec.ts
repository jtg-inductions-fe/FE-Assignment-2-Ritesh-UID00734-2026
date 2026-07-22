import { TestBed } from '@angular/core/testing';

import { RestaurantSelectionService } from './restaurant-selection.service';

describe('RestaurantSelectionService', () => {
  let service: RestaurantSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
