import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Node } from '../models/Node';
import { Edge } from '../models/Edge';
import { User } from '../models/User';

/**
 * Service for interacting with backend API.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all nodes from the backend.
   *
   * @returns Observable array of Nodes.
   */
  fetchNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(`${this.baseUrl}/nodes`);
  }

  /**
   * Fetch all edges from the backend.
   *
   * @returns Observable array of Edges.
   */
  fetchEdges(): Observable<Edge[]> {
    return this.http.get<Edge[]>(`${this.baseUrl}/edges`);
  }

  /**
   * Update node position.
   *
   * @param id Node ID.
   * @param x New X position.
   * @param y New Y position.
   */
  updateNodePosition(id: string, x: number, y: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/nodes/${id}/position`, { x, y });
  }

  /**
   * Register a new user.
   *
   * @param username User's username.
   * @param email User's email.
   * @param password User's password.
   * @returns Success message from backend.
   */
  register(username: string, email: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/auth/signup`, { username, email, password });
  }

  /**
   * Authenticate a user.
   *
   * @param username Username.
   * @param password Password.
   * @returns User data with JWT token.
   */
  authenticate(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/signin`, { username, password });
  }

  /**
   * Example test authentication request.
   *
   * @param token JWT token.
   * @returns Example authenticated response.
   */
  testAuthenticatedEndpoint(token: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.baseUrl}/test/hello`, { headers, responseType: 'text' });
  }
}
