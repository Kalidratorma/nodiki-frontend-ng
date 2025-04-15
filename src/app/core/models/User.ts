/**
 * Model representing a User authenticated within the system.
 */
export interface User {
  /** Username of the user. */
  username: string;

  /** Email address of the user. */
  email: string;

  /** List of roles assigned to the user. */
  roles: string[];

  /** JWT authentication token for the user. */
  token: string;
}
