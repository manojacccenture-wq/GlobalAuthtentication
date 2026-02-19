import PasswordForm from '../common/PasswordForm';

const CreatePasswordStep = ({ formData = {}, onFormChange = () => {} }) => {
  return (
    <PasswordForm
      mode="create"
      formData={formData}
      onFormChange={onFormChange}
    />
  );
};

export default CreatePasswordStep;
