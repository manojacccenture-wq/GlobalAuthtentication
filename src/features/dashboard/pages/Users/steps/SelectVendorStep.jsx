import React from 'react';

const RadioButton = ({ checked = false, onChange = () => {}, label = '' }) => (
  <div
    className="flex items-center gap-3 cursor-pointer flex-1"
    onClick={onChange}
  >
    <div className="flex-shrink-0">
      <div
        className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
          checked
            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
            : 'border-[var(--color-neutral-30)] bg-white'
        }`}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-white"></div>}
      </div>
    </div>
    <p className="font-semibold text-base leading-5 text-[var(--color-text-title)]">
      {label}
    </p>
  </div>
);

const SelectVendorStep = ({ watch, setValue, errors }) => {
  const selectedRole = watch("role");
  const selectedVendor = watch("vendor");

  const roles = [
    { id: 'vendor', label: 'Vendor' },
    { id: 'supervisor', label: 'Supervisor' },
    { id: 'cleaner', label: 'Cleaner' }
  ];

  const vendors = [
    { id: 1, label: 'Vendor1' },
    { id: 2, label: 'Vendor2' },
    { id: 3, label: 'Vendor3' },
    { id: 4, label: 'Vendor4' },
    { id: 5, label: 'Vendor5' },
    { id: 6, label: 'Vendor6' }
  ];

  return (
    <div className="flex flex-col gap-8 w-full">

      {/* ===== ROLE ===== */}
      <div className="flex flex-col gap-4">
        <h3 className="font-medium leading-6">
          Select Role
        </h3>

        <div className="flex gap-3 w-full">
          {roles.map((r) => (
            <RadioButton
              key={r.id}
              checked={selectedRole === r.label}
              onChange={() => setValue("role", r.label, { shouldValidate: true })}
              label={r.label}
            />
          ))}
        </div>

        {errors.role && (
          <p className="text-red-500 text-sm mt-1">
            {errors.role.message}
          </p>
        )}
      </div>

      {/* ===== VENDOR ===== */}
      <div className="flex flex-col gap-4">
        <h3 className="font-medium leading-6">
          Select Vendor
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {vendors.map((v) => (
            <RadioButton
              key={v.id}
              checked={selectedVendor === v.label}
              onChange={() => setValue("vendor", v.label, { shouldValidate: true })}
              label={v.label}
            />
          ))}
        </div>

        {errors.vendor && (
          <p className="text-red-500 text-sm mt-1">
            {errors.vendor.message}
          </p>
        )}
      </div>

    </div>
  );
};

export default SelectVendorStep;
