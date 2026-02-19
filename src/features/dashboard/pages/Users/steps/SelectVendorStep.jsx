import React, { useState } from 'react';

const RadioButton = ({ checked = false, onChange = () => { }, label = '' }) => (
  <div className="flex items-center gap-3 cursor-pointer flex-1">
    <div className="flex-shrink-0">
      <div
        className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${checked
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
          : 'border-[var(--color-neutral-30)] bg-white'
          }`}
        onClick={onChange}
      >
        {checked && (
          <div className="w-2 h-2 rounded-full bg-white"></div>
        )}
      </div>
    </div>
    <p className="font-semibold text-base leading-5 text-[var(--color-text-title)] font-['Outfit',sans-serif]">
      {label}
    </p>
  </div>
);

const SelectVendorStep = ({
  onRoleChange = () => { },
  onVendorChange = () => { },
  selectedRole = 'Supervisor',
  selectedVendor = 'Vendor1'
}) => {
  const [role, setRole] = useState(selectedRole);
  const [vendor, setVendor] = useState(selectedVendor);

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

  const handleRoleChange = (roleLabel) => {
    setRole(roleLabel);
    onRoleChange(roleLabel);
  };

  const handleVendorChange = (vendorLabel) => {
    setVendor(vendorLabel);
    onVendorChange(vendorLabel);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4">
        <h3 className=" font-medium leading-6 ">
          Select Role
        </h3>
        <div className="flex gap-3 w-full">
          {roles.map((r) => (
            <RadioButton
              key={r.id}
              checked={role === r.label}
              onChange={() => handleRoleChange(r.label)}
              label={r.label}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className=" font-medium leading-6  ">
          Select Vendor
        </h3>
        <div className="flex flex-col gap-3 w-full">
          <div className="grid grid-cols-3 gap-3">
            {vendors.slice(0, 3).map((v) => (
              <RadioButton
                key={v.id}
                checked={vendor === v.label}
                onChange={() => handleVendorChange(v.label)}
                label={v.label}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {vendors.slice(3, 6).map((v) => (

              <RadioButton
                key={v.id}
                checked={vendor === v.label}
                onChange={() => handleVendorChange(v.label)}
                label={v.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectVendorStep;
