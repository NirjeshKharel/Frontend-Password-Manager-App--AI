import React from 'react';
import { 
  Star, 
  Briefcase, 
  ShoppingBag, 
  CreditCard, 
  Share2, 
  Film, 
  Layers 
} from 'lucide-react';
import { CategoryCount } from '../../types';

interface SidebarProps {
  categories: CategoryCount[];
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  activeCategory,
  onCategorySelect
}) => {
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

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:block">
      <div className="h-full flex flex-col overflow-y-auto">
        <nav className="px-4 py-6 flex-1">
          <ul className="space-y-1">
            {/* All Passwords */}
            <li>
              <button
                onClick={() => onCategorySelect('all')}
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
                onClick={() => onCategorySelect('favorites')}
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
                    onClick={() => onCategorySelect(category.category)}
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
                  onClick={() => onCategorySelect('Uncategorized')}
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
    </aside>
  );
};

export default Sidebar;