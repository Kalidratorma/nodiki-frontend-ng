/**
 * Interface for user registration request.
 */
export interface RegisterRequest {
  /** User's username */
  username: string;
  /** User's email */
  email: string;
  /** User's password */
  password: string;
}

/**
 * Interface for user login request.
 */
export interface LoginRequest {
  /** User's username */
  username: string;
  /** User's password */
  password: string;
}

/**
 * Interface for the JWT response returned by the server after login.
 */
export interface JwtResponse {
  /** JWT token string */
  token: string;
  /** Token type (usually "Bearer") */
  type: string;
  /** Username associated with the token */
  username: string;
  /** Email associated with the token */
  email: string;
  /** Array of assigned roles (e.g., ["ROLE_USER"]) */
  roles: string[];
}
