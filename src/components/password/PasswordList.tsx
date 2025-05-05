import React from 'react';
import { PasswordEntry } from '../../types';
import PasswordCard from './PasswordCard';

interface PasswordListProps {
  passwords: PasswordEntry[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const PasswordList: React.FC<PasswordListProps> = ({
  passwords,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {
  if (passwords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
          <svg 
            className="h-12 w-12 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No passwords found</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
          {passwords.length === 0 
            ? "You haven't added any passwords yet. Click the 'Add Password' button to create your first entry." 
            : "No passwords match your current filter or search criteria. Try adjusting your search or clearing filters."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {passwords.map((password) => (
        <PasswordCard
          key={password.id}
          password={password}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default PasswordList;