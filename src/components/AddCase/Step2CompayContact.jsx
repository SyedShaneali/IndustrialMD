export default function Step2CompanyContact({ data, onChange, readOnly }) {
  const handle = (e) => {
    if (readOnly) return;
    onChange({ ...data, [e.target.name]: e.target.value });
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

  return (
    <div>
      <p className="text-sm text-[#131315] mb-1">Step 2/7</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Reported Company &amp; Point of Contact Details</h2>
      <hr className="border-gray-200 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Primary POC ─────────────────────────────────────── */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Company POC First Name<span className="text-red-500">*</span>
          </label>
          <input
            name="companyPOCFirstName"
            value={data.companyPOCFirstName || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="First name"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Company POC Last Name<span className="text-red-500">*</span>
          </label>
          <input
            name="companyPOCLastName"
            value={data.companyPOCLastName || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Last name"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Company POC Job Title<span className="text-red-500">*</span>
          </label>
          <input
            name="companyPOCJobTitle"
            value={data.companyPOCJobTitle || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="e.g. Safety Manager"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Company POC Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="companyPOCPhoneNumber"
            value={data.companyPOCPhoneNumber || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="+1 000 000 0000"
            className={inputClass}
          />
        </div>

        {/* ── Alternative POC ──────────────────────────────────── */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Alternative POC Full Name</label>
          <input
            name="altPOCFullName"
            value={data.altPOCFullName || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Full name"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Alternative POC Job Title</label>
          <input
            name="altPOCJobTitle"
            value={data.altPOCJobTitle || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="e.g. HR Director"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Alternative POC Phone Number</label>
          <input
            type="tel"
            name="altPOCPhoneNumber"
            value={data.altPOCPhoneNumber || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="+1 000 000 0000"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Alternative POC Notes</label>
          <input
            name="altPOCNotes"
            value={data.altPOCNotes || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Any notes about this contact"
            className={inputClass}
          />
        </div>

        {/* ── Reported Company ─────────────────────────────────── */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Reported Company Name</label>
          <input
            name="reportedCompanyName"
            value={data.reportedCompanyName || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Company name"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Reported Region</label>
          <input
            name="reportedRegion"
            value={data.reportedRegion || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="e.g. Northeast"
            className={inputClass}
          />
        </div>

        {/* ── Reported Project ─────────────────────────────────── */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Reported Project Name / Number</label>
          <input
            name="reportedProjectNameNumber"
            value={data.reportedProjectNameNumber || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="e.g. PRJ-2026-001"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Reported Project City</label>
          <input
            name="reportedProjectCity"
            value={data.reportedProjectCity || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="City"
            className={inputClass}
          />
        </div>

        {/* Reported Project State — dropdown, half width */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">Reported Project State</label>
          <select
            name="reportedProjectState"
            value={data.reportedProjectState || ""}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="">Select State</option>
            {[
              "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
              "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
              "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
              "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
              "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
            ].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

      </div>
    </div>
  );
}