import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '@core/models/login-request.model';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword = true;

  loginForm: FormGroup;

  loginError = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.initializeForm();
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginError = '';

    const credentials: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: user => {
        if (!user) {
          this.loginError = 'Invalid email or password';
          return;
        }

        if (user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
          return;
        }

        this.router.navigate(['/owner/dashboard']);
      },
      error: () => {
        this.loginError = 'Something went wrong. Please try again.';
      },
    });
  }
}
