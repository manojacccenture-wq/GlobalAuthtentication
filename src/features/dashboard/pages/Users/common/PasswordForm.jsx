import React, { useState } from 'react';
import Input from '../../../../../shared/components/UI/Input/Input';

const generateStrongPassword = () => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  let password = '';
  
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  for (let i = password.length; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

const PasswordForm = ({
  mode = 'create',
  formData = {},
  initialData = {},
  onFormChange = () => {},
  onSubmit = () => {},
  onCancel = () => {},
  isLoading = false
}) => {
  const isResetMode = mode === 'reset';
  const defaultData = isResetMode ? initialData : formData;

  const [localData, setLocalData] = useState({
    password: defaultData.password || ''
  });

  const handlePasswordChange = (value) => {
    const updatedData = { ...localData, password: value };
    setLocalData(updatedData);
    if (!isResetMode) {
      onFormChange(updatedData);
    }
  };

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword();
    handlePasswordChange(newPassword);
  };

  const handleSubmit = () => {
    if (isResetMode) {
      onSubmit(localData);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex gap-3 items-start">
        <Input
          type="password"
          placeholder="Password"
          value={localData.password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <button
          type="button"
          onClick={handleGeneratePassword}
          disabled={isLoading}
          className="border-2 border-[var(--color-neutral-10)] bg-transparent rounded-lg shrink-0 size-11 flex items-center justify-center hover:bg-[var(--color-neutral-10)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Generate password"
        >
          <svg className="w-5 h-5 text-[var(--color-neutral-40)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        onClick={handleGeneratePassword}
        disabled={isLoading}
        className="bg-[var(--color-neutral-10)] text-black font-medium text-sm leading-5 font-['Outfit',sans-serif] py-2 px-6 rounded-lg hover:bg-[var(--color-neutral-20)] transition-colors duration-200 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Strong password
      </button>

      {isResetMode && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !localData.password}
          className="bg-[var(--color-primary)] text-white font-medium text-sm leading-5 font-['Outfit',sans-serif] py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Update new password
        </button>
      )}
    </div>
  );
};

export default PasswordForm;
