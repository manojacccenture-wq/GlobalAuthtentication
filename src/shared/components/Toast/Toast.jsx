import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-gray-500';
  const textColor = 'text-white';

  return (
    <div
      className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg ${bgColor} ${textColor} shadow-lg font-medium text-sm z-50 animate-fade-in-out`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Toast;
