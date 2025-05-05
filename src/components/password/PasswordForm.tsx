import React, { useState } from 'react';
import { Dice1 as Dice, RefreshCw } from 'lucide-react';
import { PasswordEntry } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { generatePassword } from '../../utils/passwordStrength';

interface PasswordFormProps {
  initialData?: PasswordEntry;
  onSubmit: (data: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>>({
    title: initialData?.title || '',
    username: initialData?.username || '',
    password: initialData?.password || '',
    website: initialData?.website || '',
    category: initialData?.category || '',
    notes: initialData?.notes || '',
    favorite: initialData?.favorite || false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(16, true, true, true, true);
    setFormData(prev => ({ ...prev, password: newPassword }));
    // Clear error if there was one
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g., Gmail Account"
        error={errors.title}
        fullWidth
        required
      />
      
      <Input
        label="Username / Email"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="your.email@example.com"
        error={errors.username}
        fullWidth
        required
      />
      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <div className="relative flex">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            error={errors.password}
            fullWidth
            className="pr-20"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button 
              type="button"
              variant="ghost"
              className="h-full px-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>
        {formData.password && <PasswordStrengthMeter password={formData.password} />}
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="button"
          variant="outline"
          onClick={handleGeneratePassword}
          className="flex items-center gap-1"
        >
          <Dice size={16} />
          Generate Password
        </Button>
      </div>
      
      <Input
        label="Website URL (optional)"
        name="website"
        value={formData.website || ''}
        onChange={handleChange}
        placeholder="https://example.com"
        fullWidth
      />
      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category (optional)
        </label>
        <select
          name="category"
          value={formData.category || ''}
          onChange={handleChange}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 rounded-md text-sm shadow-sm 
                   focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full
                   dark:border-gray-700 dark:text-gray-200"
        >
          <option value="">Select a category</option>
          <option value="Social">Social</option>
          <option value="Work">Work</option>
          <option value="Finance">Finance</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Notes (optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          placeholder="Additional notes..."
          rows={3}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 rounded-md text-sm shadow-sm 
                   focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full
                   dark:border-gray-700 dark:text-gray-200"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="favorite"
          id="favorite"
          checked={formData.favorite}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="favorite" className="text-sm text-gray-700 dark:text-gray-300">
          Mark as favorite
        </label>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Update' : 'Save'} Password
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;