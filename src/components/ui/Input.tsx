import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const baseClasses = 
      'px-3 py-2 bg-white dark:bg-gray-800 border rounded-md text-sm shadow-sm placeholder-gray-400 ' +
      'focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ' +
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none ' +
      'dark:border-gray-700 dark:text-gray-200';
    
    const errorClasses = error 
      ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300';
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseClasses} ${errorClasses} ${widthClass}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;