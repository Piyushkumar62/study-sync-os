import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = ["Platform", "Modules", "Insights", "Pricing"];

export function Navbar() {
  const [active, setActive] = useState("Platform");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-xl shadow-nav">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold tracking-tight text-foreground">
          StudySync
        </Link>

        {/* Center tabs – desktop */}
        <nav className="hidden md:flex items-center gap-1 rounded-full bg-secondary/80 p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                active === tab
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Right actions – desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/app">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Sign in
            </Button>
          </Link>
          <Link to="/app">
            <Button size="sm" className="rounded-full px-5">
              Get started
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-5 py-4 space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActive(tab); setMobileOpen(false); }}
              className="block w-full text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {tab}
            </button>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <Link to="/app" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Sign in</Button>
            </Link>
            <Link to="/app" onClick={() => setMobileOpen(false)}>
              <Button className="w-full rounded-full">Get started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
