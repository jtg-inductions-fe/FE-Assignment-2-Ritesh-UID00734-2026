import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { Restaurant } from '@core/models/restaurant.model';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss'],
})
export class RestaurantFormComponent implements OnInit {
  @Input()
  title = '';

  @Input()
  submitLabel = 'Save';

  @Input()
  restaurant?: Restaurant;

  @Output()
  save = new EventEmitter<Restaurant>();

  @Output()
  cancel = new EventEmitter<void>();

  readonly validationMessages = {
    name: {
      required: 'Restaurant name is required',
    },
    address: {
      required: 'Address is required',
    },
  };

  readonly separatorKeysCodes = [ENTER, COMMA];

  selectedOwners: string[] = [];

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    owner: [''],
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.restaurant) {
      this.patchForm();
    }
  }

  private patchForm(): void {
    this.form.patchValue({
      name: this.restaurant?.name ?? '',
      address: this.restaurant?.address ?? '',
    });

    this.selectedOwners = [...(this.restaurant?.owners ?? [])];
  }

  addOwner(event: MatChipInputEvent): void {
    const value = event.value.trim();

    if (value && !this.selectedOwners.includes(value)) {
      this.selectedOwners.push(value);
    }

    event.chipInput?.clear();

    this.form.controls.owner.setValue('');
  }

  removeOwner(email: string): void {
    this.selectedOwners = this.selectedOwners.filter(owner => owner !== email);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit({
      id: this.restaurant?.id ?? 0,
      name: this.form.getRawValue().name,
      address: this.form.getRawValue().address,
      owners: this.selectedOwners,
    });
  }
}
