const stats = [
  { label: "Total Injuries",   value: "354",    sub: "vs 78 prev. month",     bg: "bg-emerald-500" },
  { label: "New Injuries",     value: "54",     sub: "vs 78 prev. month",     bg: "bg-blue-600"    },
  { label: "Pending Injuries", value: "25",     sub: "vs 78 prev. month",     bg: "bg-orange-400"  },
  { label: "Avg. Time Spend",  value: "1m:36s", sub: "vs 2m:36s prev. month", bg: "bg-teal-400"    },
  { label: "Close Injuries",   value: "100",    sub: "vs 78 prev. month",     bg: "bg-violet-500"  },
];

function BoxIcon({ bg }) {
  return (
    <div className={`p-2 ${bg} rounded-xl shadow-[0px_4px_4px_0px_rgba(124,131,135,0.25)] flex items-center justify-center`}>
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    </div>
  );
}

export default function InjuriesOverview() {
  return (
    <div className="bg-[#F7F9FA] rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold font-sans text-gray-900">Injuries Overview</h3>
        <button className="text-xs text-gray-400 hover:text-[#0148AF] transition-colors">View All</button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center gap-5">
            <BoxIcon bg={s.bg} />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-zinc-800 font-sans">{s.label}</p>
              <p className="text-[10px] text-gray-400">Last month</p>
              <p className="text-2xl sm:text-3xl font-semibold text-zinc-800 font-sans mt-1">{s.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}