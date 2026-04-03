import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCases } from "../services/CaseService";
import TopBar from "../components/UserDashboard/Topbar";
import CaseTable from "../components/UserDashboard/CaseTable";
import Pagination from "../components/UserDashboard/Pagination";
import { axiosInstance } from "../lib/axios";
import { Plus, X } from "lucide-react";
import { mapCase } from "../components/UserDashboard/Caseutils";

const ROWS_PER_PAGE = 8;

// ── Confirmation Modal ─────────────────────────────────────────────────────────
function PasswordModal({ caseId, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100">
        <div className="bg-[#1a2540] px-6 py-4">
          <h2 className="text-white font-semibold text-sm">Secure PDF Generation</h2>
          <p className="text-white/50 text-[11px] mt-0.5">Case Reference: #{caseId}</p>
        </div>
        <div className="px-6 py-6 space-y-4">
          <div className="flex items-center gap-3 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
            <span className="text-lg">🔒</span>
            <p className="text-[12px] font-medium leading-snug">
              This document will be encrypted with the system-standard password.
            </p>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed">
            Generating a protected PDF ensures sensitive case details remain confidential during transit.
          </p>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1a2540] rounded-lg hover:bg-[#0148AF] transition-all shadow-md active:scale-95"
          >
            Download Secure PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main table component ───────────────────────────────────────────────────────
export function UserTable() {
  const [cases,       setCases]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [activeTab,   setActiveTab]   = useState("All");
  const [filters,     setFilters]     = useState({});
  const [search,      setSearch]      = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalCase,   setModalCase]   = useState(null);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getAllCases();
        setCases((res.data ?? []).map(mapCase));
      } catch {
        setError("Failed to load cases. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDownloadPDF = (u) => setModalCase(u);

  const handleConfirmDownload = async () => {
    const u = modalCase;
    setModalCase(null);
    setDownloading(u.id);
    try {
      const response = await axiosInstance.post(
        "/pdf/generate-protected-pdf",
        { caseData: u },
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `protected-case-${u.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF Error:", err);
      alert("Failed to generate secure PDF. Check server logs.");
    } finally {
      setDownloading(null);
    }
  };

  const handleFilterChange = (key, val) => {
    setFilters((f) => ({ ...f, [key]: val }));
    setCurrentPage(1);
  };

  const filtered = cases.filter((u) => {
    if (activeTab === "Open"   && u.caseStatus !== "Open" && u.caseStatus !== "New") return false;
    if (activeTab === "Closed" && u.caseStatus !== "Closed") return false;
    for (const [k, v] of Object.entries(filters)) {
      if (v && !String(u[k]).toLowerCase().includes(v.toLowerCase())) return false;
    }
    if (search) {
      const s = search.toLowerCase();
      return Object.values(u).some((val) => String(val).toLowerCase().includes(s));
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  if (loading) return (
    <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
      Loading cases…
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center py-24 text-red-400 text-sm">{error}</div>
  );

  return (
    <>
      {modalCase && (
        <PasswordModal
          caseId={modalCase.id}
          onConfirm={handleConfirmDownload}
          onCancel={() => setModalCase(null)}
        />
      )}

      <div className="bg-[#F7F9FA] rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden font-sans">
        <TopBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          search={search}
          setSearch={setSearch}
          onPageReset={() => setCurrentPage(1)}
        />
        <CaseTable
          rows={paginated}
          filters={filters}
          onFilterChange={handleFilterChange}
          onDownloadPDF={handleDownloadPDF}
          downloadingId={downloading}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={filtered.length}
          rowsPerPage={ROWS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}

// ── Page wrapper ───────────────────────────────────────────────────────────────
export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 pt-5 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#1a2540]">Case Management</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Manage and track all injury cases</p>
        </div>
        <button
          onClick={() => navigate("/add-case")}
          className="flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90 active:scale-95 transition-all"
          style={{ backgroundColor: "#0148AF" }}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Case</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 pb-6">
        <UserTable />
      </div>
    </div>
  );
}