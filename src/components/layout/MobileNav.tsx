import React, { useState } from 'react';
import { Menu, X, Layers, Star, Share2, Briefcase, CreditCard, ShoppingBag, Film } from 'lucide-react';
import Button from '../ui/Button';
import { CategoryCount } from '../../types';

interface MobileNavProps {
  categories: CategoryCount[];
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  categories,
  activeCategory,
  onCategorySelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Calculate total number of passwords
  const totalPasswords = categories.reduce((acc, cat) => acc + cat.count, 0);
  
  // Map category to icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Social':
        return <Share2 size={18} />;
      case 'Work':
        return <Briefcase size={18} />;
      case 'Finance':
        return <CreditCard size={18} />;
      case 'Shopping':
        return <ShoppingBag size={18} />;
      case 'Entertainment':
        return <Film size={18} />;
      case 'Uncategorized':
        return <Layers size={18} />;
      default:
        return <Layers size={18} />;
    }
  };
  
  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Mobile trigger button */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className="p-2"
        aria-label="Open categories menu"
      >
        <Menu size={22} />
      </Button>
      
      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer panel */}
          <div className="relative flex flex-col w-72 max-w-sm bg-white dark:bg-gray-900 shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
              <h2 className="font-semibold text-gray-900 dark:text-white">Categories</h2>
              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="p-1"
                aria-label="Close menu"
              >
                <X size={20} />
              </Button>
            </div>
            
            <nav className="px-4 py-6 flex-1">
              <ul className="space-y-1">
                {/* All Passwords */}
                <li>
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                     ${activeCategory === 'all' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                  >
                    <Layers size={18} className="mr-3" />
                    <span>All Passwords</span>
                    <span className="ml-auto bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                      {totalPasswords}
                    </span>
                  </button>
                </li>
                
                {/* Favorites */}
                <li>
                  <button
                    onClick={() => handleCategoryClick('favorites')}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                     ${activeCategory === 'favorites' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                  >
                    <Star size={18} className="mr-3" />
                    <span>Favorites</span>
                  </button>
                </li>
                
                {/* Categories header */}
                <li className="pt-5 pb-2">
                  <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Categories
                  </h3>
                </li>
                
                {/* List of categories */}
                {categories
                  .filter(cat => cat.category !== 'Uncategorized')
                  .map((category) => (
                    <li key={category.category}>
                      <button
                        onClick={() => handleCategoryClick(category.category)}
                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                         ${activeCategory === category.category 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                      >
                        {getCategoryIcon(category.category)}
                        <span className="ml-3">{category.category}</span>
                        <span className="ml-auto bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                
                {/* Uncategorized (if present) */}
                {categories.find(cat => cat.category === 'Uncategorized') && (
                  <li>
                    <button
                      onClick={() => handleCategoryClick('Uncategorized')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                       ${activeCategory === 'Uncategorized' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                    >
                      <Layers size={18} className="mr-3" />
                      <span>Uncategorized</span>
                      <span className="ml-auto bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                        {categories.find(cat => cat.category === 'Uncategorized')?.count || 0}
                      </span>
                    </button>
                  </li>
                )}
              </ul>
            </nav>
            
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                <p>Passwords are stored locally</p>
                <p>and never leave your device</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;