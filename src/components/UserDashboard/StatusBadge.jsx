export default function StatusBadge({ status }) {
  const color =
    status === "New"    ? "text-blue-600"  :
    status === "Open"   ? "text-gray-700"  :
    status === "Closed" ? "text-green-600" : "text-gray-400";

  return <span className={`text-[15px] font-semibold ${color}`}>{status}</span>;
}