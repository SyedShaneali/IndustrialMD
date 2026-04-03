import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import InjuriesOverview from "./InjuriesOverView";
import CallsOverview from "./CallsOverView";
import CallVolumeChart from "./CallVolumeChart";
import InjuriesVolumeChart from "./InjuriesVolumeChart";
import PerformanceSummary from "./PerformanceSummary";
import RecentCallsStatus from "./RecentCallStatus";

export default function Dashboard() {
  const [period, setPeriod] = useState("This month");

  return (
    <div className="p-4 sm:p-6 min-h-full">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:border-gray-400 bg-white transition-colors">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span className="hidden sm:inline">{period}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* ── Row 1: Injuries + Calls Overview ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <InjuriesOverview />
        <CallsOverview />
      </div>

      {/* ── Row 2: Charts + Recent Calls ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CallVolumeChart />
            <InjuriesVolumeChart />
          </div>
          <PerformanceSummary />
        </div>
        <div className="xl:col-span-1">
          <RecentCallsStatus />
        </div>
      </div>

    </div>
  );
}