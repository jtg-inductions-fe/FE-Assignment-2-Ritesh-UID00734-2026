import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormControl,
} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { Restaurant } from '@core/models/restaurant.model';

export function ownersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const errors: ValidationErrors = {};
    const list = control.value?.list || [];
    const inputError = control.value?.inputError || false;

    if (!Array.isArray(list) || list.length === 0) {
      errors['atLeastOneRequired'] = true;
    }
    if (inputError) {
      errors['email'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss'],
})
export class RestaurantFormComponent implements OnInit {
  @Input() title = '';
  @Input() submitLabel = 'Save';
  @Input() restaurant?: Restaurant;
  @Output() save = new EventEmitter<Restaurant>();
  @Output() cancel = new EventEmitter<void>();

  readonly validationMessages = {
    name: { required: 'Restaurant name is required' },
    address: { required: 'Address is required' },
    ownersList: {
      atLeastOneRequired: 'At least one owner email is required.',
      email: 'Please enter a valid email address.',
    },
  };

  readonly separatorKeysCodes = [ENTER, COMMA];
  selectedOwners: string[] = [];
  ownerInputValue = '';
  hasEmailError = false;

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    ownersControl: [
      { list: [] as string[], inputError: false },
      [ownersValidator()],
    ],
  });

  private emailValidationControl = new FormControl('', [Validators.email]);

  constructor(private readonly formBuilder: FormBuilder) {}

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
    this.updateOwnersControl();
  }

  private updateOwnersControl(): void {
    this.form.controls.ownersControl.setValue({
      list: this.selectedOwners,
      inputError: this.hasEmailError,
    });
    this.form.controls.ownersControl.updateValueAndValidity();
  }

  onInputChange(value: string): void {
    this.ownerInputValue = value;
    if (!value.trim()) {
      this.hasEmailError = false;
      this.updateOwnersControl();
    }
  }

  addOwner(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.emailValidationControl.setValue(value);
      const isValidEmail = this.emailValidationControl.valid;

      if (isValidEmail) {
        this.hasEmailError = false;
        if (!this.selectedOwners.includes(value)) {
          this.selectedOwners.push(value);
        }
        event.chipInput?.clear();
        this.ownerInputValue = '';
        this.updateOwnersControl();
      } else {
        this.hasEmailError = true;
        this.updateOwnersControl();
        this.form.controls.ownersControl.markAsTouched();
      }
    } else {
      event.chipInput?.clear();
    }
  }

  removeOwner(email: string): void {
    this.selectedOwners = this.selectedOwners.filter(owner => owner !== email);
    this.updateOwnersControl();
    this.form.controls.ownersControl.markAsTouched();
  }

  onSubmit(): void {
    if (this.ownerInputValue.trim()) {
      this.emailValidationControl.setValue(this.ownerInputValue.trim());
      this.hasEmailError = this.emailValidationControl.invalid;
      this.updateOwnersControl();
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.controls.ownersControl.markAsTouched();
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
