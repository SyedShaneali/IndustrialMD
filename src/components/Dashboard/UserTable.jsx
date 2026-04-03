import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios"; 

// Match the password defined in the backend
const PDF_PASSWORD = "MedCase@2024"; 

const mockUsers = [
  { id: "20260227_2341", provider: "Ricky McShane, DO",  company: "DBM Global (Schuff, Graywolf, Banker)", location: "Graywolf", poc: "test test", employee: "Gustavo Solano", date: "02/25/2026", status: "Open", followUp: "None", hasEmail: false, isNew: false },
  { id: "20260227_2340", provider: "Caylie Bisceglia",   company: "DBM Global (Schuff, Graywolf, Banker)", location: "Schuff Steel", poc: "ABC Co ABC Co", employee: "Gustavo Solano", date: "02/25/2026", status: "Open", followUp: "None", hasEmail: true, isNew: false },
  { id: "20260227_2339", provider: "Chad Berkan", company: "Lithko Contracting, LLC", location: "Allentown, PA (BURG)", poc: "test test", employee: "Gustavo Solano", date: "02/25/2026", status: "Open", followUp: "None", hasEmail: true, isNew: false },
];

const COLUMNS = [
  { key: "id", label: "Case #" },
  { key: "provider", label: "Assigned Provider" },
  { key: "company", label: "Assigned Company" },
  { key: "location", label: "Location/Region" },
  { key: "poc", label: "POC Full Name" },
  { key: "employee", label: "Employee Full Name" },
  { key: "date", label: "Date of Injury" },
  { key: "status", label: "Status" },
  { key: "followUp", label: "Follow-Up Date" },
];

// Icons
const IconSearch = () => <svg style={{width:14,height:14}} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const IconDoc = () => <svg style={{width:19,height:19}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const IconEdit = () => <svg style={{width:19,height:19}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconDownload = () => <svg style={{width:19,height:19}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IconEmail = () => <svg style={{width:13,height:13,color:"#16a34a"}} viewBox="0 0 24 24" fill="#16a34a"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;

export default function UserTable() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [downloading, setDownloading] = useState(null);
  const rowsPerPage = 8;

  // ── Handle Automatic PDF Download ──────────────────────────────────────────
  const handleDownloadPDF = async (u) => {
    setDownloading(u.id);
    try {
      const response = await axiosInstance.post(
        "/pdf/generate-protected-pdf",
        {
          caseData: u,
          password: PDF_PASSWORD, // Fixed password sent to backend
        },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `case-${u.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF Error:", err);
      alert("Failed to generate PDF.");
    } finally {
      setDownloading(null);
    }
  };

  // ── Filtering Logic ────────────────────────────────────────────────────────
  const filtered = mockUsers.filter((u) => {
    if (activeTab === "Open" && u.status !== "Open" && u.status !== "New") return false;
    if (activeTab === "Closed" && u.status !== "Closed") return false;
    if (search) {
      const s = search.toLowerCase();
      return Object.values(u).some((val) => String(val).toLowerCase().includes(s));
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="bg-[#F7F9FA] rounded-2xl border border-gray-200 overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100 flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {["All", "Open", "Closed"].map((t) => (
            <button
              key={t}
              onClick={() => { setActiveTab(t); setCurrentPage(1); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeTab === t ? "bg-[#1a2540] text-white border-[#1a2540]" : "bg-white text-gray-600 border-gray-300 hover:border-[#1a2540]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"><IconSearch /></span>
          <input
            className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-400 w-44"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="bg-[#1a2540]">
              {COLUMNS.map((col) => (
                <th key={col.key} className="px-3 py-3 text-left text-[11px] font-semibold text-white uppercase tracking-wide">
                  {col.label}
                </th>
              ))}
              <th className="px-3 py-3 w-28" />
            </tr>
          </thead>
          <tbody>
            {paginated.map((u, i) => (
              <tr key={u.id} className={`border-b border-gray-100 hover:brightness-[0.97] ${i % 2 === 0 ? "bg-white" : "bg-[#F7F9FA]"}`}>
                <td className="px-3 py-3 text-xs font-semibold text-gray-700">
                   <div className="flex items-center gap-1.5">{u.id} {u.hasEmail && <IconEmail />}</div>
                </td>
                <td className="px-3 py-3 text-xs text-gray-700">{u.provider}</td>
                <td className="px-3 py-3 text-xs text-gray-600 max-w-[180px]">{u.company}</td>
                <td className="px-3 py-3 text-xs text-gray-700">{u.location}</td>
                <td className="px-3 py-3 text-xs text-gray-700">{u.poc}</td>
                <td className="px-3 py-3 text-xs text-gray-700">{u.employee}</td>
                <td className="px-3 py-3 text-xs text-gray-700">{u.date}</td>
                <td className="px-3 py-3 text-xs font-semibold text-gray-700">{u.status}</td>
                <td className="px-3 py-3 text-xs text-gray-700">{u.followUp}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5 justify-end">
                    <button onClick={() => navigate(`/case/view-details/${u.id}`)} className="hover:text-[#0148AF]"><IconDoc /></button>
                    <button onClick={() => navigate(`/case/edit/${u.id}`)} className="hover:text-[#0148AF]"><IconEdit /></button>
                    <button 
                      onClick={() => handleDownloadPDF(u)} 
                      disabled={downloading === u.id}
                      className="hover:text-[#0148AF] transition-colors disabled:opacity-40"
                    >
                      {downloading === u.id ? <span className="text-[10px] text-blue-500 font-bold animate-pulse">...</span> : <IconDownload />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-5 py-3 bg-white border-t border-gray-100 flex items-center justify-between">
        <span className="text-[11px] text-gray-400">Page {currentPage} of {totalPages}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="w-7 h-7 border rounded disabled:opacity-30">‹</button>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="w-7 h-7 border rounded disabled:opacity-30">›</button>
        </div>
      </div>
    </div>
  );
}