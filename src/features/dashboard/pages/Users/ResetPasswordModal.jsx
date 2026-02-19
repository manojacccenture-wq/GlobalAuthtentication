import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../shared/components/Modal/Modal';
import PasswordForm from './common/PasswordForm';
import { resetPassword } from '../../../../app/store/slices/userSlice';
import { showToast } from '../../../../app/store/slices/toastSlice';
import { resetPasswordSchema } from './validation/userSchemas';

const ResetPasswordModal = ({
  isOpen = false,
  onClose = () => {},
  userData = {},
  onSave = () => {}
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.loading);
  const [errors, setErrors] = useState({});
  const userName = userData.username || userData.userName || 'User';

  const handleSubmit = async (formData) => {
    try {
      // Validate form data
      const validatedData = await resetPasswordSchema.parseAsync(formData);
      setErrors({});
      
      // Dispatch Redux action to reset password
      await dispatch(resetPassword({ id: userData.id, password: validatedData.password })).unwrap();
      
      // Dispatch success toast notification
      dispatch(showToast({ message: 'Password reset successfully', type: 'success' }));
      
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
        console.error('Error resetting password:', error);
        dispatch(showToast({ message: error?.message || 'Failed to reset password', type: 'error' }));
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
          <p className="text-lg font-medium text-[var(--color-text-title)] font-['Outfit',sans-serif] leading-[22px]">
            Password change
          </p>
          <p className="text-base font-normal text-[var(--color-neutral-30)] font-['Outfit',sans-serif] leading-[20px]">
            Set a new password for {userName}
          </p>
        </div>
      }
      showCloseButton={true}
    >
      <PasswordForm
        mode="reset"
        initialData={userData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Modal>
  );
};

export default ResetPasswordModal;
