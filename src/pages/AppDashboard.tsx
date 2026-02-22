import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AppSidebar, AppTopbar } from "@/components/app/AppShell";
import { DashboardContent } from "@/components/app/DashboardContent";
import { ModulesContent } from "@/components/app/ModulesContent";

const AppDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const renderContent = () => {
    if (location.pathname === "/app/modules") return <ModulesContent />;
    return <DashboardContent />;
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <AppTopbar sidebarCollapsed={collapsed} />
      <main className={`transition-all duration-200 p-6 ${collapsed ? "ml-16" : "ml-60"}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AppDashboard;
