const stats = [
  { label: "Total Calls",     value: "54",     sub: "vs 78 prev. month",     bg: "bg-blue-500"   },
  { label: "Avg. Time Spend", value: "1m:36s", sub: "vs 2m:36s prev. month", bg: "bg-orange-400" },
  { label: "Flagged Calls",   value: "100",    sub: "vs 78 prev. month",     bg: "bg-green-500"  },
];

function BoxIcon({ bg }) {
  return (
    <div className={`p-2 ${bg} rounded-xl shadow-[0px_4px_4px_0px_rgba(124,131,135,0.25)] flex items-center justify-center`}>
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
      </svg>
    </div>
  );
}

export default function CallsOverview() {
  return (
    <div className="bg-[#F7F9FA] rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold font-sans text-gray-900">Calls Overview</h3>
        <button className="text-xs text-gray-400 hover:text-[#0148AF] transition-colors">View All</button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
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