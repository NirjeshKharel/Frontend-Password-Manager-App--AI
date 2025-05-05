import { PasswordEntry } from '../types';

// Storage key for passwords
const STORAGE_KEY = 'secure_password_manager_data';

/**
 * Retrieves all password entries from local storage
 */
export const getPasswords = (): PasswordEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving passwords:', error);
    return [];
  }
};

/**
 * Saves all password entries to local storage
 */
export const savePasswords = (passwords: PasswordEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
  } catch (error) {
    console.error('Error saving passwords:', error);
  }
};

/**
 * Adds a new password entry
 */
export const addPassword = (password: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>): PasswordEntry => {
  const passwords = getPasswords();
  const newPassword: PasswordEntry = {
    ...password,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  savePasswords([...passwords, newPassword]);
  return newPassword;
};

/**
 * Updates an existing password entry
 */
export const updatePassword = (updatedPassword: PasswordEntry): PasswordEntry => {
  const passwords = getPasswords();
  const updated = passwords.map(password => 
    password.id === updatedPassword.id 
      ? { ...updatedPassword, updatedAt: Date.now() } 
      : password
  );
  
  savePasswords(updated);
  return { ...updatedPassword, updatedAt: Date.now() };
};

/**
 * Deletes a password entry
 */
export const deletePassword = (id: string): void => {
  const passwords = getPasswords();
  const filtered = passwords.filter(password => password.id !== id);
  savePasswords(filtered);
};

/**
 * Gets categories with count of passwords in each
 */
export const getCategories = (): { category: string; count: number }[] => {
  const passwords = getPasswords();
  const categories: Record<string, number> = {};
  
  // Count passwords in each category
  passwords.forEach(password => {
    const category = password.category || 'Uncategorized';
    categories[category] = (categories[category] || 0) + 1;
  });
  
  // Convert to array format
  return Object.entries(categories).map(([category, count]) => ({
    category,
    count
  }));
};