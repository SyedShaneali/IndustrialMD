const rows = [
  { name: "Abdul Wahab", email: "abdulwahab@gmail.com", duration: "1m:36s", injury: "Injury" },
  { name: "Ali Raza",    email: "aliraza@gmail.com",    duration: "1m:36s", injury: "Injury" },
  { name: "Haider",      email: "haider@gmail.com",     duration: "1m:36s", injury: "Injury" },
  { name: "Waqas Ahmed", email: "waqas@gmail.com",      duration: "1m:36s", injury: "Injury" },
];

function Avatar({ name }) {
  const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQa8Rxqr_hb8AMHN4DEEg_cGg4yUNdaX6lyg&s";

  return (
    <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border border-gray-100">
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function PerformanceSummary() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-lg font-semibold font-sans text-gray-900">Performance Summary</h3>
        <button className="text-xs text-gray-400 hover:text-[#0148AF] transition-colors">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[400px]">
          <thead>
            <tr className="bg-[#EEEEEE]">
              <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2.5 rounded-l-lg">Agent</th>
              <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2.5 hidden sm:table-cell">Email</th>
              <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2.5">Call Duration</th>
              <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2.5 rounded-r-lg">Injury</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={row.name} />
                    <span className="text-xs font-medium text-gray-800 whitespace-nowrap">{row.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-xs text-gray-500 hidden sm:table-cell">{row.email}</td>
                <td className="px-3 py-3 text-xs text-gray-700">{row.duration}</td>
                <td className="px-3 py-3 text-xs text-gray-700">{row.injury}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}