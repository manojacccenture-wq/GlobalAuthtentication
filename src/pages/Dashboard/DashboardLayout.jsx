import React from "react";
import Sidebar from "./Sidebar";
import AppBar from "./AppBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <AppBar />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
