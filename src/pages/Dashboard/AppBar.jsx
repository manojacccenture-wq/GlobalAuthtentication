import React from "react";
// import arrowLeft from "../../assets/arrow-left.svg";

export default function AppBar() {
  return (
    <div className="h-[70px] border-b flex items-center px-6 justify-between">
      <div className="flex items-center gap-3">
        {/* <img src={arrowLeft} alt="back" className="w-5 h-5 cursor-pointer" /> */}
        <h2 className="text-lg font-medium text-gray-800">
          Task Details
        </h2>
      </div>

      <div>
        {/* Trailing icon or profile icon */}
      </div>
    </div>
  );
}
