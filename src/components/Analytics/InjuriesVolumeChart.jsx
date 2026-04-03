import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Oct, 2022", Outbound: 60,  Inbound: 80  },
  { month: "Nov, 2022", Outbound: 40,  Inbound: 150 },
  { month: "Dec, 2022", Outbound: 80,  Inbound: 70  },
  { month: "Jan, 2023", Outbound: 30,  Inbound: 60  },
  { month: "Feb, 2023", Outbound: 70,  Inbound: 100 },
  { month: "Mar, 2023", Outbound: 90,  Inbound: 200 },
];

export default function InjuriesVolumeChart() {
  return (
    <div className="bg-[#F7F9FA] rounded-2xl border border-gray-200 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-lg font-semibold font-sans text-gray-900">Injuries Volume</h3>
        <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm bg-teal-200 inline-block" /> Outbound
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm bg-teal-500 inline-block" /> Inbound
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} ticks={[0, 50, 100, 200, 300, 400]} />
          <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: 12 }} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Bar dataKey="Inbound"  stackId="a" fill="#14b8a6" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Outbound" stackId="a" fill="#99f6e4" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}