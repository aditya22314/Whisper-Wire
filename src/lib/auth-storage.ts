/**
 * Utility functions to sync NextAuth session data to localStorage
 * Note: Only store non-sensitive user info. Never store passwords or tokens.
 */

export interface UserData {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
}

const STORAGE_KEY = "whisper-wire-user";

/**
 * Save user data to localStorage
 */
export function saveUserToStorage(userData: UserData): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error("Failed to save user to localStorage:", error);
  }
}

/**
 * Get user data from localStorage
 */
export function getUserFromStorage(): UserData | null {
  if (typeof window === "undefined") return null;
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to read user from localStorage:", error);
    return null;
  }
}

/**
 * Clear user data from localStorage
 */
export function clearUserFromStorage(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear user from localStorage:", error);
  }
}

