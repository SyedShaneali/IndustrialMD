import { TrendingUp } from "lucide-react";

const calls = [
  { name: "Abdul Wahab", email: "abdulwahab@gmail.com", rank: 1, trend: 2, qa: "86%", flagged: "1,240", csat: "76%" },
  { name: "Ali Raza",    email: "aliraza@gmail.com",    rank: 2, trend: 2, qa: "86%", flagged: "1,240", csat: "76%" },
  { name: "Haider",      email: "haider@gmail.com",     rank: 3, trend: 2, qa: "86%", flagged: "1,240", csat: "76%" },
];

function Avatar({ name }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
      {initials}
    </div>
  );
}

export default function RecentCallsStatus() {
  return (
    <div className="bg-[#F7F9FA] rounded-2xl border border-gray-200 p-4 sm:p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-lg font-semibold font-sans text-gray-900">Recent Calls Status</h3>
        <button className="text-xs text-gray-400 hover:text-[#0148AF] transition-colors">View All</button>
      </div>

      <div className="flex flex-col gap-3">
        {calls.map((c) => (
          <div key={c.rank} className="border border-gray-100 bg-white rounded-xl p-3 sm:p-3.5 hover:border-gray-200 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <Avatar name={c.name} />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 truncate">{c.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="flex items-center gap-0.5 text-xs text-green-500 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" /> {c.trend}
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded text-[#0148AF]">
                  #{c.rank}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
              <div>
                <p className="text-[12px] text-gray-400">QA Score</p>
                <p className="text-xs sm:text-sm md:text-lg font-semibold  font-sans text-gray-900">{c.qa}</p>
              </div>
              <div>
                <p className="text-[12px] text-gray-400">Flagged</p>
                <p className="text-xs sm:text-sm md:text-lg font-semibold  font-sans text-gray-900">{c.flagged}</p>
              </div>
              <div>
                <p className="text-[12px] text-gray-400">Avg CSAT</p>
                <p className="text-xs sm:text-sm md:text-lg font-semibold  font-sans text-gray-900">{c.csat}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}