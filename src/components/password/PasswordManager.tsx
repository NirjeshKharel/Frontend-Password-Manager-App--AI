import React, { useState, useEffect } from 'react';
import usePasswords from '../../hooks/usePasswords';
import PasswordList from './PasswordList';
import PasswordForm from './PasswordForm';
import Modal from '../ui/Modal';
import Layout from '../layout/Layout';
import { PasswordEntry } from '../../types';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

const PasswordManager: React.FC = () => {
  const { 
    passwords,
    filteredPasswords,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    add,
    update,
    remove,
    toggleFavorite
  } = usePasswords();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<PasswordEntry | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Update category counts when passwords change
  useEffect(() => {
    // This effect keeps the component updated when passwords change
  }, [passwords]);

  // Handle adding a new password
  const handleAdd = (data: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    add(data);
    setIsAddModalOpen(false);
    showNotification('Password added successfully!', 'success');
  };

  // Handle editing a password
  const handleEdit = (id: string) => {
    const passwordToEdit = passwords.find(p => p.id === id);
    if (passwordToEdit) {
      setCurrentPassword(passwordToEdit);
      setIsEditModalOpen(true);
    }
  };

  // Handle updating a password
  const handleUpdate = (data: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (currentPassword) {
      update({
        ...currentPassword,
        ...data
      });
      setIsEditModalOpen(false);
      showNotification('Password updated successfully!', 'success');
    }
  };

  // Handle deleting a password
  const handleDelete = (id: string) => {
    const passwordToDelete = passwords.find(p => p.id === id);
    if (passwordToDelete) {
      setCurrentPassword(passwordToDelete);
      setIsDeleteModalOpen(true);
    }
  };

  // Confirm password deletion
  const confirmDelete = () => {
    if (currentPassword) {
      remove(currentPassword.id);
      setIsDeleteModalOpen(false);
      showNotification('Password deleted successfully!', 'success');
    }
  };

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({
      show: true,
      message,
      type
    });

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <Layout
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filter={filter}
      onFilterChange={setFilter}
      onAddNew={() => setIsAddModalOpen(true)}
    >
      {/* Main password list */}
      <PasswordList
        passwords={filteredPasswords}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleFavorite={toggleFavorite}
      />
      
      {/* Add password modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Password"
        size="lg"
      >
        <PasswordForm
          onSubmit={handleAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
      
      {/* Edit password modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Password"
        size="lg"
      >
        {currentPassword && (
          <PasswordForm
            initialData={currentPassword}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
      
      {/* Delete confirmation modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Password"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center text-red-600">
            <AlertTriangle size={22} className="mr-2" />
            <h3 className="text-lg font-medium">Confirm deletion</h3>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete <strong>{currentPassword?.title}</strong>? 
            This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Notification toast */}
      {notification.show && (
        <div className={`fixed bottom-4 right-4 flex items-center p-4 rounded-md shadow-lg ${
          notification.type === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200' : 
          'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'
        } animate-fade-in-up z-50`}>
          {notification.type === 'success' ? (
            <CheckCircle size={20} className="mr-2" />
          ) : (
            <AlertTriangle size={20} className="mr-2" />
          )}
          {notification.message}
        </div>
      )}
    </Layout>
  );
};

export default PasswordManager;