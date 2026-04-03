import { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Search, Mail, Bell, ChevronDown, LogOut,
  UserCircle, Settings, Plus, Menu, X,
  Home, FolderPlus, LayoutDashboard, BarChart2,
} from "lucide-react";
import mainIcon from "../assets/icons/main_icon2.png";

const navLinks = [
  { label: "Home",      to: "/",               icon: Home },
  { label: "New Case",  to: "/add-case",        icon: FolderPlus },
  { label: "Dashboard", to: "/user-dashboard",  icon: LayoutDashboard },
  { label: "Analytics", to: "/analytics",       icon: BarChart2 },
];

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const navigate  = useNavigate();
  const searchRef = useRef(null);

  /* close search on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {/* ─────────────────────────────────────────
          SIDE DRAWER  (mobile only)
      ───────────────────────────────────────── */}

      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden
          ${drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out md:hidden
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <img src={mainIcon} alt="Industrial MD" className="h-10 w-auto object-contain" />
          <button
            onClick={closeDrawer}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeDrawer}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${isActive
                  ? "bg-blue-50 text-[#0148AF]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"}`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}

          {/* Add Case CTA */}
          <button
            onClick={() => { navigate("/add-case"); closeDrawer(); }}
            className="mt-3 flex items-center justify-center gap-2 bg-[#0148AF] text-white
              text-sm font-semibold px-4 py-3 rounded-xl hover:bg-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Case
          </button>
        </nav>

        {/* User info at the bottom of drawer */}
        <div className="border-t border-gray-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-gray-600">AK</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Admin Khan</p>
              <p className="text-xs text-gray-400 truncate">admin@cd-mgmt.com</p>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-[#0148AF] transition-colors">
              <UserCircle className="w-4 h-4" /> Profile
            </button>
            <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </button>
            <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ─────────────────────────────────────────
          TOP NAVBAR
      ───────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="w-full px-4 sm:px-6 py-2.5 flex items-center gap-3">

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors shrink-0"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Logo */}
          <a href="/" className="shrink-0">
            <img src={mainIcon} alt="Industrial MD" className="h-10 sm:h-12 w-auto object-contain" />
          </a>

          {/* Search bar — sm and up */}
          <div className="hidden sm:flex items-center bg-[#F7F9FA] rounded-full px-4 py-2 gap-2 w-48 lg:w-64">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </div>

          {/* Search icon — mobile only */}
          <div className="sm:hidden relative" ref={searchRef}>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            {searchOpen && (
              <div className="absolute left-0 top-11 w-64 bg-white border border-gray-200 rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2 z-50">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search…"
                  className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
                />
              </div>
            )}
          </div>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-[#0148AF]"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex-1" />

          {/* Right side */}
          <div className="flex items-center gap-1 shrink-0">

            {/* Add Case — desktop */}
            <button
              onClick={() => navigate("/add-case")}
              className="hidden md:flex items-center gap-1.5 bg-[#0148AF] text-white text-xs
                font-semibold px-3.5 py-2 rounded-lg hover:bg-blue-700 transition-all mr-2"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Case
            </button>

            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>

            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

            {/* Profile avatar */}
            <div className="relative ml-1">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">AK</span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform hidden sm:block ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-gray-900 text-sm font-semibold">Admin Khan</p>
                    <p className="text-gray-400 text-xs">admin@cd-mgmt.com</p>
                  </div>
                  <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#0148AF] transition-colors">
                    <UserCircle className="w-4 h-4" /> Profile
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors border-t border-gray-100">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}