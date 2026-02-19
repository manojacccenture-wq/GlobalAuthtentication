import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../shared/components/Modal/Modal';
import PersonalDetailsStep from './steps/PersonalDetailsStep';
import { updateUser } from '../../../../app/store/slices/userSlice';
import { showToast } from '../../../../app/store/slices/toastSlice';
import { editUserSchema } from './validation/userSchemas';

const EditUserModal = ({
  isOpen = false,
  onClose = () => { },
  userData = {},
  onSave = () => { }
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.loading);
  const [errors, setErrors] = useState({});
  const userRole = userData.role || 'User';

  const handleSubmit = async (formData) => {
    try {
      // Validate form data
      const validatedData = await editUserSchema.parseAsync(formData);
      setErrors({});
      
      // Dispatch Redux action to update user
      await dispatch(updateUser({ id: userData.id, userData: validatedData })).unwrap();
      
      // Dispatch success toast notification
      dispatch(showToast({ message: 'User updated successfully', type: 'success' }));
      
      // Call onSave callback if provided
      if (onSave) {
        onSave(formData);
      }
      
      onClose();
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        // Handle API error
        console.error('Error updating user:', error);
        dispatch(showToast({ message: error?.message || 'Failed to update user', type: 'error' }));
      }
    }
  };

  const handleCancel = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="628px"
      closeOnEsc={true}
      closeOnOverlayClick={true}
      header={
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium  leading-[22px]">
            Edit {userRole} details
          </p>
          <p className="text-base font-normal  leading-[20px]">
            Update {userRole} personal details
          </p>
        </div>
      }
      showCloseButton={true}
    >
      <PersonalDetailsStep
        mode="edit"
        initialData={userData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Modal>
  );
};

export default EditUserModal;
