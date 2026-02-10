
import type { User } from '../types';

function getFromLocalStorage<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    }
  } catch (error) {
    console.error("Error getting from localStorage", error);
  }
  return null;
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage", error);
  }
}

export function saveUser(user: User): void {
  const users = getFromLocalStorage<User[]>('users') || [];
  const userExists = users.some(u => u.email === user.email);
  if (!userExists) {
    user.id = Math.max(...users.map(u => u.id), 0) + 1;
    user.token = `token_${user.id}_${Date.now()}`;
    users.push(user);
    saveToLocalStorage<User[]>('users', users);
  }
}

export function getUserByEmail(email: string): User | null {
  const users = getFromLocalStorage<User[]>('users');
  if (users) {
    return users.find(u => u.email === email) || null;
  }
  return null;
}

export function loginUser(email: string, password: string): boolean {
  const users = getFromLocalStorage<User[]>('users');
  if (users) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      saveToLocalStorage<string>('currentUserToken', user.token);
      saveToLocalStorage<User>('currentUser', user);
      return true;
    }
  }
  return false;
}

export function getCurrentUser(): User | null {
  return getFromLocalStorage<User>('currentUser');
}

export function logout(): void {
  removeFromLocalStorage('currentUserToken');
  removeFromLocalStorage('currentUser');
}

export function isLoggedIn(): boolean {
  const currentUser = getCurrentUser();
  const token = getFromLocalStorage<string>('currentUserToken');
  return !!currentUser && !!token;
}