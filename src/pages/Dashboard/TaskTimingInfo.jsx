import React from "react";

const timingData = [
  { label: "Start time", value: "--" },
  { label: "End time", value: "--" },
  { label: "Duration", value: "--" },
  { label: "Supervisor", value: "Sarah" },
  { label: "Cleaner", value: "Priya" },
];

export default function TaskTimingInfo() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {timingData.map((item, index) => (
        <div key={index}>
          <p className="font-semibold text-gray-900">
            {item.label}
          </p>
          <p className="text-gray-400 text-sm">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
