export default function Step5ProviderDoc({ data, onChange, readOnly }) {
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
      <p className="text-sm text-[#131315] mb-1">Step 5/7</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Industrial MD Provider Documented Details</h2>
      <hr className="border-gray-200 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Row 1: Tobacco/Nicotine History | Tetanus Status ── */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Tobacco/Nicotine History
          </label>
          <select
            name="tobaccoNicotineHistory"
            value={data.tobaccoNicotineHistory ?? "Unknown"}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="Unknown">Unknown</option>
            <option value="Never">Never</option>
            <option value="Former">Former</option>
            <option value="Current">Current</option>
            <option value="Non-Contributory">Non-Contributory</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Tetanus Status
          </label>
          <select
            name="tetanusStatus"
            value={data.tetanusStatus ?? "Non-Contributory"}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="Non-Contributory">Non-Contributory</option>
            <option value="Up to Date">Up to Date</option>
            <option value="Not Up to Date">Not Up to Date</option>
            <option value="Unknown">Unknown</option>
            <option value="Administered">Administered Today</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

        {/* ── Medication Allergy Details — full width ── */}
        <div className="relative md:col-span-2">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Medication Allergy Details
          </label>
          <textarea
            name="medicationAllergyDetails"
            value={data.medicationAllergyDetails || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="List any known medication allergies..."
            rows={2}
            className={textareaClass}
          />
        </div>

        {/* ── Pertinent Medical History — full width ── */}
        <div className="relative md:col-span-2">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Pertinent Medical History
          </label>
          <textarea
            name="pertinentMedicalHistory"
            value={data.pertinentMedicalHistory || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Relevant past medical history..."
            rows={2}
            className={textareaClass}
          />
        </div>

        {/* ── Non-Pertinent Medical History — internal, full width ── */}
        <div className="relative md:col-span-2">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Non-Pertinent Medical History{" "}
            <span className="text-gray-400 font-normal">(Internal, Not company visible)</span>
          </label>
          <textarea
            name="nonPertinentMedicalHistory"
            value={data.nonPertinentMedicalHistory ?? "None Stated:"}
            onChange={handle}
            readOnly={readOnly}
            rows={2}
            className={textareaClass}
          />
        </div>

        {/* ── Mechanism of Injury — full width ── */}
        <div className="relative md:col-span-2">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Mechanism of Injury
          </label>
          <textarea
            name="mechanismOfInjury"
            value={data.mechanismOfInjury || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="How did the injury occur mechanically?"
            rows={2}
            className={textareaClass}
          />
        </div>

        {/* ── Description of Symptoms / Observational Notes — full width ── */}
        <div className="relative md:col-span-2">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Description of Symptoms / Observational Notes
          </label>
          <textarea
            name="descriptionOfSymptoms"
            value={data.descriptionOfSymptoms || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Observed symptoms and clinical findings..."
            rows={2}
            className={textareaClass}
          />
        </div>

        {/* ── Row: Body Part Injured | Side of Body Injured ── */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Body Part Injured
          </label>
          <input
            name="bodyPartInjured"
            value={data.bodyPartInjured || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="e.g. Lumbar Spine"
            className={inputClass}
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Side of Body Injured
          </label>
          <select
            name="sideOfBodyInjured"
            value={data.sideOfBodyInjured || ""}
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

        {/* ── Event, Nature, and Source of Injury — full width ── */}
        <div className="relative md:col-span-2">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            Event, Nature, and Source of Injury
          </label>
          <textarea
            name="eventNatureSourceOfInjury"
            value={data.eventNatureSourceOfInjury || ""}
            onChange={handle}
            readOnly={readOnly}
            placeholder="Describe the event, nature, and source..."
            rows={2}
            className={textareaClass}
          />
        </div>

        {/* ── OSHA Reporting Outcome — half width ── */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-[#131315]">
            OSHA Reporting Outcome
          </label>
          <select
            name="oshaReportingOutcome"
            value={data.oshaReportingOutcome ?? "Non-Recordable/Lost Time"}
            onChange={handle}
            disabled={readOnly}
            className={selectClass}
          >
            <option value="Non-Recordable/Lost Time">Non-Recordable/Lost Time</option>
            <option value="Recordable - First Aid">Recordable - First Aid</option>
            <option value="Recordable - Medical Treatment">Recordable - Medical Treatment</option>
            <option value="Recordable - Restricted Duty">Recordable - Restricted Duty</option>
            <option value="Recordable - Lost Time">Recordable - Lost Time</option>
            <option value="Recordable - Hospitalization">Recordable - Hospitalization</option>
            <option value="Recordable - Fatality">Recordable - Fatality</option>
          </select>
          {!readOnly && <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">▾</span>}
        </div>

      </div>
    </div>
  );
}