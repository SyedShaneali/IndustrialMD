import { useNavigate } from "react-router-dom";
import { COLUMNS } from "./caseUtils";
import StatusBadge from "./StatusBadge";
import { IconDoc, IconEdit, IconDownload, IconEmail, IconFilter } from "./icons";

// ── Desktop table head ─────────────────────────────────────────────────────────
function TableHead({ filters, onFilterChange }) {
  return (
    <thead>
      <tr className="bg-[#1a2540]">
        {COLUMNS.map((col) => (
          <th
            key={col.key}
            className="px-4 py-3.5 text-left text-[13px] font-semibold text-white whitespace-nowrap tracking-wide"
          >
            {col.label}
          </th>
        ))}
        <th className="px-4 py-3.5 w-28" />
      </tr>
      <tr className="bg-[#22304f]">
        {COLUMNS.map((col) => (
          <td key={col.key} className="px-3 py-2">
            <div className="flex items-center gap-1">
              <input
                className="w-full bg-white/10 border border-white/20 rounded px-2.5 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:border-white/50"
                value={filters[col.key] || ""}
                onChange={(e) => onFilterChange(col.key, e.target.value)}
                placeholder="Filter…"
              />
              <IconFilter />
            </div>
          </td>
        ))}
        <td className="px-3 py-2" />
      </tr>
    </thead>
  );
}

// ── Desktop table row ──────────────────────────────────────────────────────────
function CaseRow({ u, index, onDownloadPDF, downloadingId }) {
  const navigate = useNavigate();
  const isDownloading = downloadingId === u.id;

  const rowBg =
    u.caseStatus === "New"
      ? "bg-[#e8eaf6]"
      : index % 2 === 0
      ? "bg-white"
      : "bg-[#F7F9FA]";

  return (
    <tr className={`border-b border-gray-100 transition-all hover:brightness-[0.97] ${rowBg}`}>
      <td className="px-4 py-3.5 text-[14px] whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${
            u.caseStatus === "New" ? "text-[#0148AF] cursor-pointer hover:underline"
            : u.contactEmail ? "text-green-600" : "text-gray-700"
          }`}>
            {u.id}
          </span>
          {u.contactEmail && <IconEmail />}
        </div>
      </td>
      <td className="px-4 py-3.5 text-[14px] text-gray-700">{u.assignedProvider}</td>
      <td className="px-4 py-3.5 text-[14px] text-gray-600 max-w-[180px] truncate">{u.companyName}</td>
      <td className="px-4 py-3.5 text-[14px] text-gray-700">{u.incidentLocation}</td>
      <td className="px-4 py-3.5 text-[14px] text-gray-700">{u.contactFirstName}</td>
      <td className="px-4 py-3.5 text-[14px] text-gray-700">{u.empFirstName}</td>
      <td className="px-4 py-3.5 text-[14px] text-gray-700 whitespace-nowrap">{u.injuryDate}</td>
      <td className="px-4 py-3.5"><StatusBadge status={u.caseStatus} /></td>
      <td className="px-4 py-3.5 text-[14px] text-gray-700 whitespace-nowrap">{u.followUpDate}</td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2.5 justify-end text-gray-600">
          <button title="View Details"
            onClick={(e) => { e.stopPropagation(); navigate(`/case/view-details/${u._id}`); }}
            className="hover:text-[#0148AF] transition-colors p-1">
            <IconDoc className="w-5 h-5" />
          </button>
          <button title="Edit Case"
            onClick={(e) => { e.stopPropagation(); navigate(`/case/edit-details/${u._id}`); }}
            className="hover:text-[#0148AF] transition-colors p-1">
            <IconEdit className="w-5 h-5" />
          </button>
          <button title="Download PDF"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDownloadPDF(u); }}
            disabled={isDownloading}
            className="hover:text-[#0148AF] transition-colors p-1 disabled:opacity-40">
            {isDownloading
              ? <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin inline-block" />
              : <IconDownload className="w-5 h-5" />}
          </button>
        </div>
      </td>
    </tr>
  );
}

// ── Mobile card ────────────────────────────────────────────────────────────────
function CaseCard({ u, onDownloadPDF, downloadingId }) {
  const navigate   = useNavigate();
  const isDownloading = downloadingId === u.id;

  const borderColor =
    u.caseStatus === "New"    ? "border-l-[#0148AF]"
    : u.caseStatus === "Open" ? "border-l-amber-400"
    : "border-l-gray-300";

  return (
    <div className={`bg-white rounded-xl border border-gray-200 border-l-4 ${borderColor} p-4 shadow-sm`}>
      {/* Top row: case # + status */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-[#1a2540]">#{u.id}</span>
            {u.contactEmail && <IconEmail />}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{u.injuryDate}</p>
        </div>
        <StatusBadge status={u.caseStatus} />
      </div>

      {/* Employee & Company */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
        {[
          { label: "Employee",  value: u.empFirstName },
          { label: "Company",   value: u.companyName },
          { label: "Provider",  value: u.assignedProvider },
          { label: "Location",  value: u.incidentLocation },
          { label: "Contact",   value: u.contactFirstName },
          { label: "Follow Up", value: u.followUpDate },
        ].map(({ label, value }) =>
          value ? (
            <div key={label}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
              <p className="text-[13px] text-gray-700 truncate">{value}</p>
            </div>
          ) : null
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={() => navigate(`/case/view-details/${u._id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#0148AF] hover:text-[#0148AF] transition-all"
        >
          <IconDoc className="w-4 h-4" /> View
        </button>
        <button
          onClick={() => navigate(`/case/edit-details/${u._id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#0148AF] hover:text-[#0148AF] transition-all"
        >
          <IconEdit className="w-4 h-4" /> Edit
        </button>
        <button
          onClick={(e) => { e.preventDefault(); onDownloadPDF(u); }}
          disabled={isDownloading}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#0148AF] hover:text-[#0148AF] transition-all disabled:opacity-40"
        >
          {isDownloading
            ? <span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            : <IconDownload className="w-4 h-4" />}
          PDF
        </button>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function CaseTable({ rows, filters, onFilterChange, onDownloadPDF, downloadingId }) {
  return (
    <>
      {/* ── Desktop table (md+) ─────────────────────────────────────────────── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <TableHead filters={filters} onFilterChange={onFilterChange} />
          <tbody>
            {rows.map((u, i) => (
              <CaseRow
                key={u._id}
                u={u}
                index={i}
                onDownloadPDF={onDownloadPDF}
                downloadingId={downloadingId}
              />
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length + 1} className="text-center py-16 text-[14px] text-gray-400 bg-white">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile card list (< md) ─────────────────────────────────────────── */}
      <div className="md:hidden px-4 py-4 space-y-3 bg-[#F7F9FA]">
        {rows.length === 0 ? (
          <p className="text-center py-12 text-[14px] text-gray-400">No records found.</p>
        ) : (
          rows.map((u) => (
            <CaseCard
              key={u._id}
              u={u}
              onDownloadPDF={onDownloadPDF}
              downloadingId={downloadingId}
            />
          ))
        )}
      </div>
    </>
  );
}