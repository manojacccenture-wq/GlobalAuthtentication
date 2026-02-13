import React from "react";
import { useNavigate } from "react-router-dom";

const imgGroup8 = "http://localhost:3845/assets/9ae46564b473b48d334d07ddd9a222a151c2a28f.svg";
const imgGroup7 = "http://localhost:3845/assets/b59609fee7b20b867697c51b961e1f343dfeff87.svg";
const imgArrowLeft = "http://localhost:3845/assets/7fec9bdf2df739a987bef6ac982b4964026dbd41.svg";
const imgFrame ="../../assets/Logo/Tolly_Logo.png";

const AccessDenied = () => {
  const navigate = useNavigate();

  const handleBackToSignIn = () => {
    navigate("/");
  };

  return (
    <div className="bg-white relative min-h-screen flex flex-col">
      {/* Back Arrow */}
      {/* <button
        onClick={handleBackToSignIn}
        className="absolute cursor-pointer bg-none border-none p-0 hover:opacity-70 transition-opacity"
        aria-label="Go back"
      >
        <img alt="back arrow" src={imgArrowLeft} className="w-full h-full"    onClick={handleBackToSignIn}/>
      </button> */}

      {/* Main Content Container */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-[12px] w-full max-w-[373px]">
          {/* Logo Section */}
          <div className="h-[82px] flex items-end justify-center gap-[6px]">
            <div className="size-[46px]">
              <img alt="Toily" src={imgFrame} className="w-full h-full" />
            </div>
      
          </div>

          {/* Icon Container */}
          <div className="bg-[rgba(0,191,166,0.1)] border-[10px] border-[rgba(0,191,166,0.12)] border-solid rounded-[108px] px-[22px] py-[26px] flex items-center justify-center w-full">
            <div className="relative w-[146.661px] h-[137.608px]">
              <img alt="vendor contact illustration" src={imgGroup7} className="w-full h-full" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-[4px] items-center text-center w-full">
            <h1 className="font-medium text-[18px] leading-[22px] text-[#0e121e]">
              Contact your vendor
            </h1>
            <p className="font-medium text-[16px]  text-[#cbced6]">
              Please contact your vendor. They will notify the admin to help reset your password.
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center px-4 pb-8">
        <button
          onClick={handleBackToSignIn}
          className="bg-[#00bfa6] text-white font-medium text-[16px] leading-[20px] px-[24px] py-[12px] rounded-[8px] w-full max-w-[393px] cursor-pointer hover:bg-[#00a691] transition-colors"
        >
          Back to sign in
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
