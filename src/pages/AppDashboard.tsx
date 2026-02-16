import { useState } from "react";
import { AppSidebar, AppTopbar } from "@/components/app/AppShell";
import { DashboardContent } from "@/components/app/DashboardContent";

const AppDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <AppTopbar sidebarCollapsed={collapsed} />
      <main className={`transition-all duration-200 p-6 ${collapsed ? "ml-16" : "ml-60"}`}>
        <DashboardContent />
      </main>
    </div>
  );
};

export default AppDashboard;
