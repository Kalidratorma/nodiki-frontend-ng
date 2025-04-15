import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Component responsible for handling user login.
 * Implements a reactive form and redirects to the board on success.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /**
   * Reactive form for login.
   */
  loginForm: FormGroup;

  /**
   * Indicates if login was successful.
   */
  loginSuccess = false;

  /**
   * Indicates if login failed.
   */
  loginError = false;

  /**
   * Initializes login form and injects required services.
   * @param fb FormBuilder instance
   * @param authService Authentication service
   * @param router Router for navigation
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Handles login submission. Navigates to /board on success.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login({ username, password }).subscribe({
        next: (response) => {
          this.loginSuccess = true;
          this.loginError = false;
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/board');
        },
        error: () => {
          this.loginError = true;
          this.loginSuccess = false;
        },
      });
    }
  }
}
