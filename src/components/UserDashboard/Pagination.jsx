export default function Pagination({ currentPage, totalPages, totalRecords, rowsPerPage, onPageChange }) {
  const start = totalRecords === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end   = Math.min(currentPage * rowsPerPage, totalRecords);

  // Smart page number range — show max 5 pages with ellipsis logic
  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "…", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "…", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "…", currentPage - 1, currentPage, currentPage + 1, "…", totalPages);
    }
    return pages;
  };

  return (
    <div className="px-4 sm:px-6 py-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">

      {/* Record count */}
      <span className="text-[13px] sm:text-[14px] text-gray-400 order-2 sm:order-1">
        Showing {start}–{end} of {totalRecords} records
      </span>

      {/* Page controls */}
      <div className="flex items-center gap-1 order-1 sm:order-2 flex-wrap justify-center">
        {/* Prev */}
        <button
          onClick={() => onPageChange((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[15px] rounded border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-default transition-colors"
        >
          ‹
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[13px] text-gray-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 sm:w-9 sm:h-9 text-[13px] sm:text-[14px] rounded border transition-colors ${
                p === currentPage
                  ? "bg-[#1a2540] text-white border-[#1a2540]"
                  : "border-gray-200 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[15px] rounded border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-default transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
}