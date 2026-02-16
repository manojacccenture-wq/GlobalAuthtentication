import { Outlet } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/AppBar";
import { useLayout } from "../context/LayoutContext";

const DashboardLayout = () => {
  const { layout } = useLayout();

  return (
    <div className="flex h-screen bg-slate-50">

      {/* Sidebar */}
      {layout.sidebar && <Sidebar />}

      {/* Right Section */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        {layout.header && <Header />}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
