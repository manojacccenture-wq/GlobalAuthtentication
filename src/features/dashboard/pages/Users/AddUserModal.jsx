import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../shared/components/Modal/Modal';
import AddUserStepper from './AddUserStepper';
import SelectVendorStep from './steps/SelectVendorStep';
import PersonalDetailsStep from './steps/PersonalDetailsStep';
import CreatePasswordStep from './steps/CreatePasswordStep';
import Button from '../../../../shared/components/UI/Button/Button';
import { createUser } from '../../../../app/store/slices/userSlice';
import { showToast } from '../../../../app/store/slices/toastSlice';
import { createUserSchema } from './validation/userSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

const AddUserModal = ({ isOpen = false, onClose = () => {} }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.loading);
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
  const [errors, setErrors] = useState({});

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    // Validate current step before moving forward
    if (currentStep === 1) {
      // Validate personal details step
      try {
        const personalDetailsSchema = createUserSchema.pick({
          userId: true,
          userName: true,
          email: true,
          phone: true,
          aadharCardNumber: true,
          pancardNumber: true,
          address: true
        });
        await personalDetailsSchema.parseAsync(formData);
        setErrors({});
        setCurrentStep(currentStep + 1);
      } catch (error) {
        const newErrors = {};
        error.errors?.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    } else if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate complete form data
      const validatedData = await createUserSchema.parseAsync(formData);
      setErrors({});
      
      // Dispatch Redux action to create user
      await dispatch(createUser(validatedData)).unwrap();
      
      // Dispatch success toast notification
      dispatch(showToast({ message: 'User created successfully', type: 'success' }));
      
      // Reset form and close modal on success
      setFormData({
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
      setCurrentStep(0);
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
        console.error('Error creating user:', error);
        dispatch(showToast({ message: error?.message || 'Failed to create user', type: 'error' }));
      }
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
            disabled={currentStep === 0 || isLoading}
            // className="px-6 py-2 bg-[var(--color-neutral-10)] text-[var(--color-text-title)] font-medium text-base leading-5 font-['Outfit',sans-serif] rounded-lg hover:bg-[var(--color-neutral-20)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </Button>
          <Button
            onClick={currentStep === 2 ? handleSubmit : handleNext}
            disabled={isLoading}
            // className="px-6 py-2 bg-[var(--color-primary)] text-white font-medium text-sm leading-5 font-['Outfit',sans-serif] rounded-lg hover:opacity-90 transition-opacity duration-200"
          >
            {isLoading ? 'Processing...' : (currentStep === 2 ? 'Update password' : 'Next')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;
