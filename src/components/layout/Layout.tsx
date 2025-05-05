import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { getCategories } from '../../utils/storage';
import { CategoryCount } from '../../types';

interface LayoutProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
  onAddNew: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  onAddNew,
  children
}) => {
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  const [darkMode, setDarkMode] = useState(() => {
    // Get from localStorage or system preference
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark' || 
      (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Update categories
  useEffect(() => {
    setCategories(getCategories());
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onAddNew={onAddNew}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="flex">
        <Sidebar 
          categories={categories} 
          activeCategory={filter}
          onCategorySelect={onFilterChange}
        />
        
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="md:hidden mb-4 flex items-center">
              <MobileNav 
                categories={categories}
                activeCategory={filter}
                onCategorySelect={onFilterChange}
              />
              <div className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                {filter === 'all' ? 'All Passwords' : 
                 filter === 'favorites' ? 'Favorites' : 
                 filter}
              </div>
            </div>
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;