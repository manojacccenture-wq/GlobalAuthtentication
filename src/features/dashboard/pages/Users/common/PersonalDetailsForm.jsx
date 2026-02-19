import React, { useState } from 'react';
import Input from '../../../../../shared/components/UI/Input/Input';
import Button from '../../../../../shared/components/UI/Button/Button';

const PersonalDetailsForm = ({
  mode = 'create',
  formData = {},
  initialData = {},
  onFormChange = () => {},
  onSubmit = () => {},
  onCancel = () => {},
  showButtons = false
}) => {
  const isEditMode = mode === 'edit';
  const defaultData = isEditMode ? initialData : formData;

  const [localData, setLocalData] = useState({
    userId: defaultData.userId || '',
    userName: defaultData.userName || '',
    email: defaultData.email || '',
    phone: defaultData.phone || '',
    aadharCardNumber: defaultData.aadharCardNumber || '',
    pancardNumber: defaultData.pancardNumber || '',
    address: defaultData.address || ''
  });

  const handleInputChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    if (!isEditMode) {
      onFormChange(updatedData);
    }
  };

  const handleSave = () => {
    if (isEditMode) {
      onSubmit(localData);
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      onCancel();
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Input
        type="text"
        placeholder="User ID"
        value={localData.userId}
        onChange={(e) => handleInputChange('userId', e.target.value)}
      />
      <Input
        type="text"
        placeholder="User Name"
        value={localData.userName}
        onChange={(e) => handleInputChange('userName', e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        value={localData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
      />
      <Input
        type="tel"
        placeholder="Phone"
        value={localData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
      />
      <Input
        type="text"
        placeholder="Aadhar card number"
        value={localData.aadharCardNumber}
        onChange={(e) => handleInputChange('aadharCardNumber', e.target.value)}
      />
      <Input
        type="text"
        placeholder="Pancard number"
        value={localData.pancardNumber}
        onChange={(e) => handleInputChange('pancardNumber', e.target.value)}
      />
      <textarea
        placeholder="Address"
        value={localData.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
        className="border-[1.5px] border-solid border-[var(--color-neutral-30)] bg-white rounded-[8px] px-[20px] py-[12px] w-full h-[120px] font-['Outfit',sans-serif] text-[16px] font-normal leading-[20px] text-[var(--color-neutral-40)] placeholder-[var(--color-neutral-40)] focus:outline-none focus:border-[var(--color-secondary)] resize-none"
      />

      {showButtons && isEditMode && (
        <div className="flex gap-3 items-center justify-end pt-4">
          <Button onClick={handleCancel} variant="danger">
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalDetailsForm;
