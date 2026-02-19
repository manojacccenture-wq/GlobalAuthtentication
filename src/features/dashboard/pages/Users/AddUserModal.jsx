import React, { useState } from 'react';
import Modal from '../../../../shared/components/Modal/Modal';
import AddUserStepper from './AddUserStepper';
import SelectVendorStep from './steps/SelectVendorStep';
import PersonalDetailsStep from './steps/PersonalDetailsStep';
import CreatePasswordStep from './steps/CreatePasswordStep';
import Button from '../../../../shared/components/UI/Button/Button';

const AddUserModal = ({ isOpen = false, onClose = () => {} }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    role: 'Supervisor',
    vendor: 'Vendor1',
    userId: '',
    userName: '',
    email: '',
    phone: '',
    aadharCardNumber: '',
    pancardNumber: '',
    address: '',
    password: ''
  });

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleVendorChange = (vendor) => {
    setFormData(prev => ({ ...prev, vendor }));
  };

  const handlePersonalDetailsChange = (detailsData) => {
    setFormData(prev => ({ ...prev, ...detailsData }));
  };

  const handlePasswordChange = (passwordData) => {
    setFormData(prev => ({ ...prev, ...passwordData }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <SelectVendorStep
            onRoleChange={handleRoleChange}
            onVendorChange={handleVendorChange}
            selectedRole={formData.role}
            selectedVendor={formData.vendor}
          />
        );
      case 1:
        return (
          <PersonalDetailsStep
            formData={formData}
            onFormChange={handlePersonalDetailsChange}
          />
        );
      case 2:
        return (
          <CreatePasswordStep
            formData={formData}
            onFormChange={handlePasswordChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="628px"
      closeOnEsc={true}
      closeOnOverlayClick={true}
    >
      <div className="flex flex-col gap-8">
        <AddUserStepper currentStep={currentStep} onStepClick={handleStepClick} />

        <div className="flex flex-col gap-8">
          {renderStepContent()}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-neutral-20)]">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            // className="px-6 py-2 bg-[var(--color-neutral-10)] text-[var(--color-text-title)] font-medium text-base leading-5 font-['Outfit',sans-serif] rounded-lg hover:bg-[var(--color-neutral-20)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </Button>
          <Button
            onClick={currentStep === 2 ? onClose : handleNext}
            // className="px-6 py-2 bg-[var(--color-primary)] text-white font-medium text-sm leading-5 font-['Outfit',sans-serif] rounded-lg hover:opacity-90 transition-opacity duration-200"
          >
            {currentStep === 2 ? 'Update password' : 'Next'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;
