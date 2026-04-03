import { useState } from "react";
import { IconSearch } from "./icons";
import { SlidersHorizontal, X } from "lucide-react";

export default function TopBar({ activeTab, setActiveTab, search, setSearch, onPageReset }) {
  const [showSearch, setShowSearch] = useState(false);

  const handleTab = (tab) => {
    setActiveTab(tab);
    onPageReset();
  };

  return (
    <div className="bg-white border-b border-gray-100">

      {/* ── Main row ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 gap-3 flex-wrap">

        {/* Left: tab pills — collapse labels on very small screens */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {["All", "Open", "Closed"].map((t) => (
            <button
              key={t}
              onClick={() => handleTab(t)}
              className={`px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold border transition-all ${
                activeTab === t
                  ? "bg-[#1a2540] text-white border-[#1a2540]"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#1a2540] hover:text-[#1a2540]"
              }`}
            >
              {t}
            </button>
          ))}

          {/* These two hidden on mobile, visible sm+ */}
          {["Advanced Search", "Report"].map((lbl) => (
            <button
              key={lbl}
              className="hidden sm:inline-flex px-5 py-2 rounded-full text-[14px] font-semibold border border-gray-300 bg-white text-gray-600 hover:border-[#1a2540] hover:text-[#1a2540] transition-all"
            >
              {lbl}
            </button>
          ))}

          <button className="hidden md:inline-flex px-5 py-2 rounded-full text-[14px] font-semibold border border-gray-200 bg-white text-gray-300 cursor-default">
            Return to Default View
          </button>
        </div>

        {/* Right: search — full input on md+, icon-toggle on mobile */}
        <div className="flex items-center gap-2">
          {/* Mobile search toggle */}
          <button
            className="sm:hidden p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
            onClick={() => setShowSearch((v) => !v)}
            aria-label="Toggle search"
          >
            {showSearch ? <X className="w-4 h-4" /> : <IconSearch />}
          </button>

          {/* Desktop search input (always visible sm+) */}
          <div className="relative hidden sm:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <IconSearch />
            </span>
            <input
              className="pl-9 pr-4 py-2 text-[14px] border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-400 w-52 lg:w-64 transition-all"
              placeholder="Search..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); onPageReset(); }}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile search expand ────────────────────────────────────────────── */}
      {showSearch && (
        <div className="sm:hidden px-4 pb-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <IconSearch />
            </span>
            <input
              autoFocus
              className="w-full pl-9 pr-4 py-2.5 text-[14px] border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-400"
              placeholder="Search cases..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); onPageReset(); }}
            />
          </div>
          {/* Show hidden buttons in mobile search drawer */}
          <div className="flex flex-wrap gap-2 mt-3">
            {["Advanced Search", "Report"].map((lbl) => (
              <button
                key={lbl}
                className="px-4 py-2 rounded-full text-[13px] font-semibold border border-gray-300 bg-white text-gray-600 hover:border-[#1a2540] hover:text-[#1a2540] transition-all"
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}