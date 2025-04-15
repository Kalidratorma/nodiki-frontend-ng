import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, RegisterRequest, JwtResponse } from './auth.types';

/**
 * Service for handling user authentication operations.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Registers a new user.
   * @param data User registration information
   * @returns An observable with server response
   */
  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, data);
  }

  /**
   * Logs in a user.
   * @param data User login credentials
   * @returns An observable with JWT response
   */
  login(data: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/auth/signin`, data);
  }
}
