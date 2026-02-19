import React from 'react';
import Modal from '../../../../shared/components/Modal/Modal';
import PasswordForm from './common/PasswordForm';

const ResetPasswordModal = ({
  isOpen = false,
  onClose = () => {},
  userData = {},
  onSave = () => {}
}) => {
  const userName = userData.username || userData.userName || 'User';

  const handleSubmit = (formData) => {
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
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
