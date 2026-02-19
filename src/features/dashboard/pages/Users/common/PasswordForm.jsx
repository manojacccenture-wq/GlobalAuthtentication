import React, { useState } from 'react';
import Input from '../../../../../shared/components/UI/Input/Input';
import Button from '../../../../../shared/components/UI/Button/Button';
import { generateStrongPassword } from '../../../../../utils/PasswordGenerator/PasswordGenerator';

// const generateStrongPassword = () => {
//   const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const lowercase = 'abcdefghijklmnopqrstuvwxyz';
//   const numbers = '0123456789';
//   const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

//   const allChars = uppercase + lowercase + numbers + symbols;
//   let password = '';

//   password += uppercase[Math.floor(Math.random() * uppercase.length)];
//   password += lowercase[Math.floor(Math.random() * lowercase.length)];
//   password += numbers[Math.floor(Math.random() * numbers.length)];
//   password += symbols[Math.floor(Math.random() * symbols.length)];

//   for (let i = password.length; i < 12; i++) {
//     password += allChars[Math.floor(Math.random() * allChars.length)];
//   }

//   return password.split('').sort(() => Math.random() - 0.5).join('');
// };

const PasswordForm = ({
  mode = 'create',
  formData = {},
  initialData = {},
  onFormChange = () => { },
  onSubmit = () => { },
  onCancel = () => { },
  isLoading = false
}) => {
  const isResetMode = mode === 'reset';
  const defaultData = isResetMode ? initialData : formData;

  const [copied, setCopied] = useState(false);

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

  const handleCopyPassword = async () => {
    if (!localData.password) return;

    await navigator.clipboard.writeText(localData.password);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
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

        <Button
          type="button"
          onClick={handleCopyPassword}
          disabled={isLoading || !localData.password}
          title="Copy password"
          variant="icon"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </Button>

      </div>

      <Button

        onClick={handleGeneratePassword}
        disabled={isLoading}
      >
        Generate Strong password
      </Button>

      {isResetMode && (
        <Button

          onClick={handleSubmit}
          disabled={isLoading || !localData.password}
        >
          Update new password
        </Button>
      )}
    </div>
  );
};

export default PasswordForm;
