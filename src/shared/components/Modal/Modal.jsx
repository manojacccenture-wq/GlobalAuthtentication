import React, { useEffect } from 'react';

const Modal = ({
  isOpen = false,
  onClose = () => {},
  children,
  width = '628px',
  header = null,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = ''
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-100/85 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-2xl shadow-lg relative ${className}`}
        style={{ width }}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-6 h-6 text-[var(--color-neutral-40)] hover:text-[var(--color-text-title)] transition-colors z-10"
            aria-label="Close modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        {header && (
          <div className="border-b border-[var(--color-neutral-20)] px-6 py-4">
            {header}
          </div>
        )}

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
