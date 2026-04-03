export default function Step4InjuryDetails({ data, onChange, readOnly }) {
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

  const textareaClass = `w-full border rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none ${
    readOnly
      ? "border-gray-200 bg-gray-50 text-gray-600 cursor-default"
      : "border-gray-300 bg-white text-gray-700 focus:border-[#0148AF]"
  }`;

  return (
    <div>
      <p className="text-sm text-[#131315] mb-1">Step 4/7</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Reported Injury Details</h2>
      <hr className="border-gray-200 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Row 1: Date of Injury | Time of Injury + AM/PM ── */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Date of Injury<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="reportedDateOfInjury"
            value={data.reportedDateOfInjury || ""}
            onChange={handle}
            readOnly={readOnly}
            className={inputClass}
          />
        </div>

        {/* Time + AM/PM side by side inside the right column */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
              Reported Time of Injury<span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="reportedTimeOfInjury"
              value={data.reportedTimeOfInjury || ""}
              onChange={handle}
              readOnly={readOnly}
              className={inputClass}
            />
          </div>
          <div className="relative w-28">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
              AM/PM<span className="text-red-500">*</span>
            </label>
            <select
              name="reportedTimeOfInjuryAMPM"
              value={data.reportedTimeOfInjuryAMPM || ""}
              onChange={handle}
              disabled={readOnly}
              className={selectClass}
            >
              <option value="">--</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            {!readOnly && <span className="absolute right-3 top-3.5 text-gray-400 pointer-events-none">▾</span>}
          </div>
        </div>

        {/* ── Row 2: Time Zone | Date Company Notified ── */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Time Zone
          </label>
          <select
            name="reportedTimeZone"
            value={data.reportedTimeZone || ""}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="">Select Time Zone</option>
            <option value="EST">Eastern (EST/EDT)</option>
            <option value="CST">Central (CST/CDT)</option>
            <option value="MST">Mountain (MST/MDT)</option>
            <option value="PST">Pacific (PST/PDT)</option>
            <option value="AKST">Alaska (AKST/AKDT)</option>
            <option value="HST">Hawaii (HST)</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Date Company Notified By Employee<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="reportedDateCompanyNotified"
            value={data.reportedDateCompanyNotified || ""}
            onChange={handle}
            readOnly={readOnly}
            className={inputClass}
          />
        </div>

        {/* ── Row 3: Body Part | Side of Body ── */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Body Part Injured
          </label>
          <input
            name="reportedBodyPartInjured"
            value={data.reportedBodyPartInjured || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="e.g. Lower Back, Right Knee"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Side of Body Injured
          </label>
          <select
            name="reportedSideOfBodyInjured"
            value={data.reportedSideOfBodyInjured || ""}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="">Select Side</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
            <option value="Bilateral">Bilateral</option>
            <option value="N/A">N/A</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        {/* ── Row 4: Translation Needs (half width) ── */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Translation Needs
          </label>
          <select
            name="reportedTranslationNeeds"
            value={data.reportedTranslationNeeds || ""}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="">Select Language (if needed)</option>
            <option value="None">None</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Mandarin">Mandarin</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Arabic">Arabic</option>
            <option value="Other">Other</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        {/* ── Description of Injury — full width ── */}
        <div className="relative md:col-span-2">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Reported Description of Injury
          </label>
          <textarea
            name="reportedDescriptionOfInjury"
            value={data.reportedDescriptionOfInjury || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Describe how the injury occurred..."
            rows={4}
            className={textareaClass}
          />
        </div>

      </div>
    </div>
  );
}