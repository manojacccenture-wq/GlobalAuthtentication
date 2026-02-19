import React from 'react';
import Modal from '../../../../shared/components/Modal/Modal';
import PersonalDetailsStep from './steps/PersonalDetailsStep';

const EditUserModal = ({
  isOpen = false,
  onClose = () => {},
  userData = {},
  onSave = () => {}
}) => {
  const userRole = userData.role || 'User';

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
            Edit {userRole} details
          </p>
          <p className="text-base font-normal text-[var(--color-neutral-30)] font-['Outfit',sans-serif] leading-[20px]">
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
