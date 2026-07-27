import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { LoginRequest } from '@core/models/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginError = '';

  validationMessages = {
    email: {
      required: 'Email is required',
      email: 'Enter a valid email',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 6 characters',
    },
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: user => {
        if (!user) {
          this.loginError = 'Invalid email or password';
          return;
        }
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loginError = 'Something went wrong.';
      },
    });
  }
}
