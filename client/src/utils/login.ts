const TOKEN_KEY = 'login_token';

/**
 * Stores daily login as true in sessionStorage
 */
export const setLoginStatus = (username: string): void => {
  sessionStorage.setItem(`${TOKEN_KEY}_${username}`, JSON.stringify(true));
};

/**
 * Retrieves the authentication token from sessionStorage
 * @returns The stored token or null if not found
 */
export const getLoginStatus = (username: string): string | null => {
  return sessionStorage.getItem(`${TOKEN_KEY}_${username}`);
};
