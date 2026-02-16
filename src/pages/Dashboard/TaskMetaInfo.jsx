import React from "react";

const metaData = [
  { label: "Toilet ID", value: "T12345" },
  { label: "Area", value: "Floor-3 Conference room" },
  { label: "Location", value: "Building A" },
  { label: "Vendor name", value: "Cleantech solutions" },
  { label: "Zone", value: "Zone-2 Northarea" },
  { label: "Status", value: "Pending" },
];

export default function TaskMetaInfo() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {metaData.map((item, index) => (
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
