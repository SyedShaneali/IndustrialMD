import { useState } from "react";

export default function Step6Treatment({ data, onChange, readOnly }) {
  const [newRow, setNewRow] = useState({ dateOfTreatment: "", title: "", details: "" });

  const handle = (e) => {
    if (readOnly) return;
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  // ── Treatment Rows Table helpers ──────────────────────────────────
  const rows = data.treatmentRecommendations || [];

  const addRow = () => {
    if (readOnly) return;
    if (!newRow.dateOfTreatment && !newRow.title && !newRow.details) return;
    onChange({
      ...data,
      treatmentRecommendations: [...rows, { ...newRow }],
    });
    setNewRow({ dateOfTreatment: "", title: "", details: "" });
  };

  const removeRow = (idx) => {
    if (readOnly) return;
    onChange({
      ...data,
      treatmentRecommendations: rows.filter((_, i) => i !== idx),
    });
  };

  const inputClass = `w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors ${
    readOnly
      ? "border-gray-200 bg-gray-50 text-gray-600 cursor-default"
      : "border-gray-300 bg-white text-gray-700 focus:border-[#0148AF]"
  }`;

  const selectClass = `w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors appearance-none ${
    readOnly
      ? "border-gray-200 bg-gray-50 text-gray-600 cursor-default"
      : "border-gray-300 bg-white text-[#131315] focus:border-[#0148AF]"
  }`;

  const textareaClass = `w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none ${
    readOnly
      ? "border-gray-200 bg-gray-50 text-gray-600 cursor-default"
      : "border-gray-300 bg-white text-gray-700 focus:border-[#0148AF]"
  }`;

  return (
    <div>
      <p className="text-sm text-[#131315] mb-1">Step 6/7</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Treatment Recommendations</h2>
      <hr className="border-gray-200 mb-8" />

      {/* ── Treatment Rows Table ───────────────────────────────── */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Treatment Entries</h3>
          {!readOnly && (
            <button
              type="button"
              onClick={addRow}
              className="text-sm text-[#0148AF] hover:underline font-medium"
            >
              + add
            </button>
          )}
        </div>

        {/* Table header */}
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <div className="grid grid-cols-3 bg-[#131315] text-white text-sm font-medium px-4 py-3">
            <span>Date of Treatment</span>
            <span>Title</span>
            <span>Details</span>
          </div>

          {/* Existing rows */}
          {rows.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8 bg-gray-50">
              No Rows To Show
            </div>
          ) : (
            rows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 px-4 py-3 border-t border-gray-100 text-sm text-gray-700 hover:bg-gray-50 items-center"
              >
                <span>{row.dateOfTreatment}</span>
                <span>{row.title}</span>
                <div className="flex items-center justify-between">
                  <span className="truncate">{row.details}</span>
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => removeRow(idx)}
                      className="ml-2 text-red-400 hover:text-red-600 text-xs shrink-0"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))
          )}

          {/* New row input */}
          {!readOnly && (
            <div className="grid grid-cols-3 gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50">
              <input
                type="date"
                value={newRow.dateOfTreatment}
                onChange={(e) => setNewRow({ ...newRow, dateOfTreatment: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#0148AF]"
              />
              <input
                type="text"
                placeholder="Title"
                value={newRow.title}
                onChange={(e) => setNewRow({ ...newRow, title: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#0148AF]"
              />
              <input
                type="text"
                placeholder="Details"
                value={newRow.details}
                onChange={(e) => setNewRow({ ...newRow, details: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#0148AF]"
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Rest of fields ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Assessment Summary and Remarks — full width */}
        <div className="relative md:col-span-2">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Assessment Summary and Remarks
          </label>
          <textarea
            name="assessmentSummaryAndRemarks"
            value={data.assessmentSummaryAndRemarks || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Overall assessment summary..."
            rows={3}
            className={textareaClass}
          />
        </div>

        {/* Work-Related Determination */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Work-Related Determination
          </label>
          <select
            name="workRelatedDetermination"
            value={data.workRelatedDetermination ?? "Work-Related"}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="Work-Related">Work-Related</option>
            <option value="Non-Work-Related">Non-Work-Related</option>
            <option value="Undetermined">Undetermined</option>
            <option value="Aggravation of Pre-Existing">Aggravation of Pre-Existing</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        {/* Disposition of Care */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Disposition of Care
          </label>
          <select
            name="dispositionOfCare"
            value={data.dispositionOfCare ?? "On-Site, IMD Managed"}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="On-Site, IMD Managed">On-Site, IMD Managed</option>
            <option value="Referred to ER">Referred to ER</option>
            <option value="Referred to Urgent Care">Referred to Urgent Care</option>
            <option value="Referred to Specialist">Referred to Specialist</option>
            <option value="Telemedicine">Telemedicine</option>
            <option value="Return to Work - Full Duty">Return to Work - Full Duty</option>
            <option value="Return to Work - Modified Duty">Return to Work - Modified Duty</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        {/* Additional Case Notes — full width */}
        <div className="relative md:col-span-2">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Additional Case Notes
          </label>
          <textarea
            name="additionalCaseNotes"
            value={data.additionalCaseNotes || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Any additional notes visible to the client..."
            rows={3}
            className={textareaClass}
          />
        </div>

        {/* Internal Case Notes — full width, not company visible */}
        <div className="relative md:col-span-2">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Internal Case Notes{" "}
            <span className="text-gray-400 font-normal">(Not Company-Visible)</span>
          </label>
          <textarea
            name="internalCaseNotes"
            value={data.internalCaseNotes || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Internal notes — not visible to client company..."
            rows={3}
            className={textareaClass}
          />
        </div>

      </div>
    </div>
  );
}