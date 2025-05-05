import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Star, Trash, Edit, ExternalLink } from 'lucide-react';
import { PasswordEntry } from '../../types';
import Button from '../ui/Button';
import useClipboard from '../../hooks/useClipboard';

interface PasswordCardProps {
  password: PasswordEntry;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const PasswordCard: React.FC<PasswordCardProps> = ({
  password,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { copied: passwordCopied, copy: copyPassword } = useClipboard();
  const { copied: usernameCopied, copy: copyUsername } = useClipboard();
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  const maskPassword = (pass: string) => {
    return '•'.repeat(Math.min(12, pass.length));
  };
  
  const handleCopyPassword = () => {
    copyPassword(password.password);
  };
  
  const handleCopyUsername = () => {
    copyUsername(password.username);
  };
  
  const handleVisitWebsite = () => {
    if (password.website) {
      // Add protocol if missing
      let url = password.website;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => onToggleFavorite(password.id)}
            variant="ghost"
            className={`p-1 ${password.favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
            aria-label={password.favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star size={18} fill={password.favorite ? 'currentColor' : 'none'} />
          </Button>
          <h3 className="font-medium text-gray-900 dark:text-white">{password.title}</h3>
        </div>
        <div className="flex">
          {password.category && (
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {password.category}
            </span>
          )}
        </div>
      </div>
      
      <div className="px-5 py-4 space-y-4">
        {/* Username section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Username</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{password.username}</p>
          </div>
          <Button
            onClick={handleCopyUsername}
            variant="ghost"
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Copy username"
          >
            <Copy size={16} />
            {usernameCopied && <span className="ml-1 text-xs text-green-600">Copied!</span>}
          </Button>
        </div>
        
        {/* Password section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Password</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 font-mono">
              {showPassword ? password.password : maskPassword(password.password)}
            </p>
          </div>
          <div className="flex space-x-1">
            <Button
              onClick={() => setShowPassword(!showPassword)}
              variant="ghost"
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
            <Button
              onClick={handleCopyPassword}
              variant="ghost"
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Copy password"
            >
              <Copy size={16} />
              {passwordCopied && <span className="ml-1 text-xs text-green-600">Copied!</span>}
            </Button>
          </div>
        </div>
        
        {/* Website section (if available) */}
        {password.website && (
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Website</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{password.website}</p>
            </div>
            <Button
              onClick={handleVisitWebsite}
              variant="ghost"
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Visit website"
            >
              <ExternalLink size={16} />
            </Button>
          </div>
        )}
        
        {/* Notes section (if available) */}
        {password.notes && (
          <div className="space-y-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Notes</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{password.notes}</p>
          </div>
        )}
        
        {/* Footer with dates and actions */}
        <div className="pt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Updated: {formatDate(password.updatedAt)}
          </div>
          <div className="flex space-x-1">
            <Button
              onClick={() => onEdit(password.id)}
              variant="ghost"
              className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="Edit"
            >
              <Edit size={16} />
            </Button>
            <Button
              onClick={() => onDelete(password.id)}
              variant="ghost"
              className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              aria-label="Delete"
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;