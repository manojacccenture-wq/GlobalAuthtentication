import React from "react";

const Checkbox = React.forwardRef(
  ({ label, className = "", ...props }, ref) => {
    return (
      <label
        className={`flex items-center gap-3 cursor-pointer text-sm text-gray-700 ${className}`}
      >
        <input
          type="checkbox"
          ref={ref}
          className="h-5 w-5 rounded border-2 cursor-pointer"
          {...props}   // ✅ VERY IMPORTANT
        />

        <span>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
