import React from "react";
import vendorIcon from "../../../assets/Images/Page_Image/Dashboard/User/Add_User_Flow/selectVendor.png";
import personIcon from "../../../assets/Images/Page_Image/Dashboard/User/Add_User_Flow/selectVendor.png";
import passwordIcon from "../../../assets/Images/Page_Image/Dashboard/User/Add_User_Flow/selectVendor.png";
import Button from "../UI/Button/Button";



const Stepper = ({
  steps = [],
  currentStep = 0,
  onStepClick = () => { }
}) => {
  
  const defaultSteps = [
    { id: 0, label: "Select vendor", icon: vendorIcon },
    { id: 1, label: "Personal details", icon: personIcon },
    { id: 2, label: "Create password", icon: passwordIcon }
  ];

  const stepsList = steps.length > 0 ? steps : defaultSteps;

  return (
    <div className="flex items-start justify-center gap-3 w-full">
      {stepsList.map((step, index) => {

        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-3">

{/* 
              <img
                // src={step.icon}
                src={vendorTestIcon}
                alt={step.label}
                className={`w-5 h-5 object-contain ${isActive || isCompleted
                  ? "opacity-100"
                  : "opacity-50"
                  }`}
              /> */}
              <Button
                onClick={() => onStepClick(index)}
                variant="icon"
                size="icon"

              >
                <img
                  // src={step.icon}
                  src={step.icon}
                  alt={step.label}
                  className={`w-5 h-5 object-contain ${isActive || isCompleted
                    ? "opacity-100"
                    : "opacity-50"
                    }`}
                />
              </Button>


              <p
                className={`font-bold text-xs  text-center  ${isActive
                  ? "text-[var(--color-text-title)]"
                  : "text-[var(--color-neutral-30)]"
                  }`}
              >
                {step.label}
              </p>
            </div>

            {index < stepsList.length - 1 && (
              <div className="flex items-center pt-11">
                <div
                  className={`h-1 rounded-full transition-colors duration-200 ${isCompleted || isActive
                    ? "bg-[var(--color-secondary)]"
                    : "bg-[var(--color-neutral-30)]"
                    }`}
                  style={{ width: "122px" }}
                ></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
