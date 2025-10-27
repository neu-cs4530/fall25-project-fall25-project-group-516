const TOKEN_KEY = 'auth_token';

/**
 * Stores the authentication token in localStorage
 * @param token The JWT token to store
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Retrieves the authentication token from localStorage
 * @returns The stored token or null if not found
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Removes the authentication token from localStorage
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
