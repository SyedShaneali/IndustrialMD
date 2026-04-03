export default function Step3EmployeeDetails({ data, onChange, readOnly }) {
  const handle = (e) => {
    if (readOnly) return;
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const inputClass = `w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors ${
    readOnly
      ? "border-gray-200 bg-gray-50 text-gray-600 cursor-default"
      : "border-gray-300 bg-white text-gray-700 focus:border-[#0148AF]"
  }`;

  return (
    <div>
      <p className="text-sm text-[#131315] mb-1">Step 3/7</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Reported Employee Details</h2>
      <hr className="border-gray-200 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* First Name — required */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Employee First Name<span className="text-red-500">*</span>
          </label>
          <input
            name="empFirstName"
            value={data.empFirstName || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="First name"
            className={inputClass}
          />
        </div>

        {/* Last Name — required */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Employee Last Name<span className="text-red-500">*</span>
          </label>
          <input
            name="empLastName"
            value={data.empLastName || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Last name"
            className={inputClass}
          />
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Employee Date of Birth
          </label>
          <input
            type="date"
            name="empDateOfBirth"
            value={data.empDateOfBirth || ""}
            onChange={handle}
            readOnly={readOnly}
            className={inputClass}
          />
        </div>

        {/* Age — required */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Employee Age<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="empAge"
            value={data.empAge || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="e.g. 34"
            min="16"
            max="100"
            className={inputClass}
          />
        </div>

        {/* Job Title */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Employee Job Title
          </label>
          <input
            name="empJobTitle"
            value={data.empJobTitle || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="e.g. Forklift Operator"
            className={inputClass}
          />
        </div>

        {/* Employing Company */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Employing Company
          </label>
          <input
            name="empEmployingCompany"
            value={data.empEmployingCompany || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Employer company name"
            className={inputClass}
          />
        </div>

      </div>
    </div>
  );
}