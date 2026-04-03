import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BarChart2, Clock, Users, Settings, Menu, X
} from "lucide-react";
import Navbar from "../components/Navbar";

const sideLinks = [
  { icon: LayoutDashboard, href: "/dashboard", title: "Dashboard" },
  { icon: BarChart2,       href: "/reports",   title: "Reports"   },
  { icon: Clock,           href: "/history",   title: "History"   },
  { icon: Users,           href: "/clients",   title: "Clients"   },
  { icon: Settings,        href: "/settings",  title: "Settings"  },
];

export default function DashboardLayout() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-1">
        {/* ── Desktop sidebar ── */}
        <aside className="hidden sm:flex flex-col items-center w-[60px] bg-white border-r border-gray-200 py-4 gap-2 shrink-0">
          {sideLinks.map(({ icon: Icon, href, title }) => {
            const isActive = location.pathname === href;
            return (
              <button
                key={href}
                onClick={() => navigate(href)}
                title={title}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "bg-[#0148AF] text-white shadow-sm"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </aside>

        {/* ── Mobile bottom nav ── */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex items-center justify-around px-2 py-2">
          {sideLinks.map(({ icon: Icon, href, title }) => {
            const isActive = location.pathname === href;
            return (
              <button
                key={href}
                onClick={() => navigate(href)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                  isActive ? "text-[#0148AF]" : "text-gray-400"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-medium">{title}</span>
              </button>
            );
          })}
        </nav>

        {/* ── Page content ── */}
        <main className="flex-1 overflow-auto pb-16 sm:pb-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}