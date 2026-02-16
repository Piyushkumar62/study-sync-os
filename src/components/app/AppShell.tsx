import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, CalendarDays, BarChart3,
  Lightbulb, Settings, Search, Bell, ChevronLeft, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/app" },
  { icon: BookOpen, label: "Modules", path: "/app/modules" },
  { icon: CalendarDays, label: "Planner", path: "/app/planner" },
  { icon: BarChart3, label: "Analytics", path: "/app/analytics" },
  { icon: Lightbulb, label: "Recommendations", path: "/app/recommendations" },
  { icon: Settings, label: "Settings", path: "/app/settings" },
];

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-card transition-all duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <Link to="/" className="text-base font-bold text-foreground">StudySync</Link>
        )}
        <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground">
          {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function AppTopbar({ sidebarCollapsed }: { sidebarCollapsed: boolean }) {
  return (
    <header
      className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 backdrop-blur-xl px-6 transition-all ${
        sidebarCollapsed ? "ml-16" : "ml-60"
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="relative max-w-sm w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search modules, topics..."
            className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground hidden sm:block">Feb 10 – Feb 16, 2026</span>
        <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground">
          <Bell size={18} />
        </button>
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
          AK
        </div>
      </div>
    </header>
  );
}
