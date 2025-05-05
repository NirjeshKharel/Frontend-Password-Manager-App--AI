import { useState, useEffect, useCallback } from 'react';
import { PasswordEntry } from '../types';
import { getPasswords, savePasswords, addPassword, updatePassword, deletePassword } from '../utils/storage';

export default function usePasswords() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('all');
  
  // Load passwords from localStorage
  useEffect(() => {
    setLoading(true);
    const storedPasswords = getPasswords();
    setPasswords(storedPasswords);
    setLoading(false);
  }, []);

  // Filtered passwords based on search term and category filter
  const filteredPasswords = useCallback(() => {
    return passwords.filter(password => {
      // Category filter
      const categoryMatch = filter === 'all' || filter === 'favorites' 
        ? true 
        : password.category === filter;
      
      // If filtering by favorites
      if (filter === 'favorites' && !password.favorite) {
        return false;
      }

      // Search term filter (case insensitive)
      const search = searchTerm.toLowerCase();
      const searchMatch = search === '' || 
        password.title.toLowerCase().includes(search) || 
        password.username.toLowerCase().includes(search) || 
        (password.website && password.website.toLowerCase().includes(search)) ||
        (password.notes && password.notes.toLowerCase().includes(search));
      
      return categoryMatch && searchMatch;
    });
  }, [passwords, searchTerm, filter]);

  // Add new password
  const add = useCallback((newPassword: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const added = addPassword(newPassword);
    setPasswords(prev => [...prev, added]);
    return added;
  }, []);

  // Update existing password
  const update = useCallback((updatedPassword: PasswordEntry) => {
    const updated = updatePassword(updatedPassword);
    setPasswords(prev => 
      prev.map(password => password.id === updated.id ? updated : password)
    );
    return updated;
  }, []);

  // Delete password
  const remove = useCallback((id: string) => {
    deletePassword(id);
    setPasswords(prev => prev.filter(password => password.id !== id));
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback((id: string) => {
    const password = passwords.find(p => p.id === id);
    if (password) {
      const updated = { ...password, favorite: !password.favorite };
      update(updated);
    }
  }, [passwords, update]);

  return {
    passwords,
    filteredPasswords: filteredPasswords(),
    loading,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    add,
    update,
    remove,
    toggleFavorite
  };
}