export default function Step1CaseAllocation({ data, onChange, readOnly }) {
  const handle = (e) => {
    if (readOnly) return;
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const inputClass = `w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors ${
    readOnly
      ? "border-gray-200 bg-gray-50 text-gray-600 cursor-default"
      : "border-gray-300 bg-white text-gray-700 focus:border-[#131315]"
  }`;

  const selectClass = `w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors appearance-none ${
    readOnly
      ? "border-gray-200 bg-gray-50 text-gray-600 cursor-default"
      : "border-gray-300 bg-white text-gray-500 focus:border-[#131315]"
  }`;

  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">Step 1/7</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Case Allocation Details</h2>
      <hr className="border-gray-200 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Case # — always read-only, auto-generated on save */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Case #</label>
          <input
            name="caseNumber"
            value={data.caseNumber || ""}
            readOnly
            placeholder="Save to generate"
            className={`${inputClass} cursor-default`}
          />
        </div>

        {/* Managing Company — required */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Managing Company<span className="text-red-500">*</span>
          </label>
          <select
            name="managingCompany"
            value={data.managingCompany || ""}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="">Select Managing Company</option>
            <option value="company1">Company One</option>
            <option value="company2">Company Two</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        {/* Assigned Provider */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Assigned Provider</label>
          <select
            name="assignedProvider"
            value={data.assignedProvider || ""}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="">Select Assigned Provider</option>
            <option value="provider1">Provider One</option>
            <option value="provider2">Provider Two</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        {/* Assigned Secondary Provider */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Assigned Secondary Provider</label>
          <select
            name="assignedSecondaryProvider"
            value={data.assignedSecondaryProvider || ""}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="">Select Assigned Secondary Provider</option>
            <option value="provider1">Provider One</option>
            <option value="provider2">Provider Two</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        {/* Reporting Structure 1 */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Reporting Structure 1</label>
          <select
            name="reportingStructure1"
            value={data.reportingStructure1 || ""}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="">Select Reporting Structure 1</option>
            <option value="rs1">Structure A</option>
            <option value="rs2">Structure B</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        {/* Reporting Structure 2 */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Reporting Structure 2</label>
          <select
            name="reportingStructure2"
            value={data.reportingStructure2 || ""}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="">Select Reporting Structure 2</option>
            <option value="rs1">Structure A</option>
            <option value="rs2">Structure B</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        {/* Date Industrial MD Notified — required, renamed from dateNotified */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Date Industrial MD Notified<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dateIndustrialMDNotified"
            value={data.dateIndustrialMDNotified || ""}
            onChange={handle}
            readOnly={readOnly}
            className={inputClass}
          />
        </div>

      </div>
    </div>
  );
}