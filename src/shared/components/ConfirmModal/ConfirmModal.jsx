import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../UI/Button/Button';

const CheckIconSvg = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const XIconSvg = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M6 6L18 18M18 6L6 18" />
  </svg>
);

const ConfirmModal = ({
  isOpen = false,
  title = 'Are you sure?',
  description = '',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  onConfirm = () => {},
  onCancel = () => {},
  variant = 'danger',
  isLoading = false
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      width="500px"
      closeOnEsc={true}
      closeOnOverlayClick={false}
      showCloseButton={true}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-medium text-[var(--color-text-title)] font-['Outfit',sans-serif] leading-6">
            {title}
          </h2>
          {description && (
            <p className="text-base font-normal text-[var(--color-neutral-30)] font-['Outfit',sans-serif] leading-5">
              {description}
            </p>
          )}
        </div>

        <div className="flex gap-3 items-center justify-end pt-4">
          <Button
            onClick={handleCancel}
            disabled={loading || isLoading}
            variant="danger"
            // style={{ backgroundColor: '#EF2525' }}
            // className="hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm leading-5 font-['Outfit',sans-serif] px-6 py-3 rounded-lg flex items-center gap-2 transition-opacity duration-200"
          >
            <XIconSvg />
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading || isLoading}
            // style={{ backgroundColor: '#2ECC71' }}
            // className="hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm leading-5 font-['Outfit',sans-serif] px-6 py-3 rounded-lg flex items-center gap-2 transition-opacity duration-200"
          >
            <CheckIconSvg />
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
