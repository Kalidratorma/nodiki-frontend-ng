import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Component responsible for user registration.
 * Uses reactive form and redirects to the board upon successful registration.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  /**
   * Reactive registration form.
   */
  registrationForm: FormGroup;

  /**
   * Indicates successful registration.
   */
  registrationSuccess = false;

  /**
   * Indicates registration failure.
   */
  registrationError = false;

  /**
   * Initializes registration form and injects services.
   * @param fb FormBuilder instance
   * @param authService AuthService for registration API
   * @param router Angular Router for redirection
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Handles form submission. Registers the user and navigates to the board page.
   */
  onSubmit(): void {
    if (this.registrationForm.valid) {
      const { username, email, password } = this.registrationForm.value;

      this.authService.register({ username, email, password }).subscribe({
        next: () => {
          this.registrationSuccess = true;
          this.registrationError = false;
          this.registrationForm.reset();
          this.router.navigateByUrl('/board');
        },
        error: () => {
          this.registrationError = true;
          this.registrationSuccess = false;
        }
      });
    }
  }
}
