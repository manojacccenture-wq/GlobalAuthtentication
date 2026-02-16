import React from "react";
import { menuItems } from "../../../../config/Dashboard/sidebarIcons/SidebarIcons";
// const menuItems = [
//   { label: "Overview", icon: overView },
//   { label: "Toilets", icon: toilets },
//   { label: "Vendor management", icon: vendorManagement },
//   { label: "Feedback management", icon: feedbackManagement },
//   { label: "User management", icon: userManagement },
//   { label: "Role based access", icon: roleBasedAccess },
//   { label: "Help & Support", icon: helpAndSupport },
//   { label: "Log Out", icon: logOut },
// ];

export default function Sidebar() {
  return (
    <aside className="w-[250px] border-r border-gray-100 p-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-[#00BFA6] font-bold text-lg">Toily</h1>
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#00BFA6]/10 cursor-pointer text-sm text-gray-700 hover:text-[#00BFA6] transition"
          >
            {/* ICON */}
            <img
              src={item.icon}
              alt={item.label}
              className="w-5 h-5 object-contain"
            />

            {/* TEXT */}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
