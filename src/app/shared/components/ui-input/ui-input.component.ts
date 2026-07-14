import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss'],
})
export class UiInputComponent {
  @Input({ required: true })
  control!: FormControl<string>;

  @Input()
  label = '';

  @Input()
  placeholder = '';

  @Input()
  type = 'text';

  @Input()
  appearance: MatFormFieldAppearance = 'outline';

  @Input()
  errors: Record<string, string> = {};

  @Input()
  showPasswordToggle = false;

  hidePassword = true;

  get inputType(): string {
    if (!this.showPasswordToggle) {
      return this.type;
    }

    return this.hidePassword ? 'password' : 'text';
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  get errorMessage(): string {
    if (!this.control.errors) {
      return '';
    }

    for (const key of Object.keys(this.control.errors)) {
      if (this.errors[key]) {
        return this.errors[key];
      }
    }

    return '';
  }
}
