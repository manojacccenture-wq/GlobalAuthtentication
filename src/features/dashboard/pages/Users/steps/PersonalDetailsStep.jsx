import PersonalDetailsForm from '../common/PersonalDetailsForm';

const PersonalDetailsStep = ({
  mode = 'create',
  formData = {},
  initialData = {},
  onFormChange = () => {},
  onSubmit = () => {},
  onCancel = () => {}
}) => {
  return (
    <PersonalDetailsForm
      mode={mode}
      formData={formData}
      initialData={initialData}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
      showButtons={true}
    />
  );
};

export default PersonalDetailsStep;
