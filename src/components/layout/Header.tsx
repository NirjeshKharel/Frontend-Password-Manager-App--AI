import React from 'react';
import { Lock, Search, Plus, Moon, Sun } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddNew: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAddNew,
  darkMode,
  toggleDarkMode
}) => {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <div className="flex items-center">
            <div className="bg-blue-600 p-1.5 rounded-md text-white">
              <Lock size={20} />
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">SecureVault</span>
          </div>
          
          {/* Search bar (centered) */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search passwords..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
                fullWidth
              />
            </div>
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={toggleDarkMode}
              className="p-2"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            <Button
              variant="primary"
              onClick={onAddNew}
              className="flex items-center"
              aria-label="Add new password"
            >
              <Plus size={16} className="mr-1" />
              Add Password
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;