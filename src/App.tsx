import React from 'react';
import PasswordManager from './components/password/PasswordManager';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <PasswordManager />
    </div>
  );
}

export default App;