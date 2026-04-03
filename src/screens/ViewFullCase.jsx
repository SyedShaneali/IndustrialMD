import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Loader2, ArrowLeft, Pencil, Building2, User, Stethoscope,
  ClipboardList, FileText, CalendarCheck, Paperclip,
  Clock, AlertCircle, CheckCircle2, ChevronDown, History,
  RotateCcw, ChevronRight
} from "lucide-react";
import mainIcon from "../assets/icons/main_icon.png";
import {
  getCaseById,
  getCaseVersions,
  getCaseVersion,
  restoreCaseVersion,
} from "../services/CaseService";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (val) => {
  if (val === undefined || val === null || val === "") return null;
  if (typeof val === "boolean") return val ? "Yes" : "No";
  return String(val);
};

const fmtDate = (val) => {
  if (!val) return null;
  const d = new Date(val);
  if (isNaN(d.getTime())) return val;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const fmtDateTime = (val) => {
  if (!val) return null;
  const d = new Date(val);
  if (isNaN(d.getTime())) return val;
  return d.toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

const fmtTime = (val, ampm) => {
  if (!val) return null;
  return ampm ? `${val} ${ampm}` : val;
};

// ─── Small UI pieces ──────────────────────────────────────────────────────────

function Badge({ children, color = "blue" }) {
  const colors = {
    blue:   "bg-blue-50 text-blue-700 border-blue-200",
    green:  "bg-green-50 text-green-700 border-green-200",
    amber:  "bg-amber-50 text-amber-700 border-amber-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    gray:   "bg-gray-100 text-gray-600 border-gray-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[color]}`}>
      {children}
    </span>
  );
}

function Field({ label, value, full = false }) {
  if (!value && value !== 0) return null;
  return (
    <div className={full ? "col-span-full" : ""}>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-sm text-gray-800 leading-relaxed">{value}</p>
    </div>
  );
}

function Divider() {
  return <div className="col-span-full h-px bg-gray-100 my-1" />;
}

function Section({ icon: Icon, title, color = "#0148AF", children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
          <h2 className="text-sm font-bold text-gray-800">{title}</h2>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 border-t border-gray-50">
          <div className="col-span-full h-1" />
          {children}
        </div>
      )}
    </div>
  );
}

function ListSection({ icon: Icon, title, color = "#0148AF", items = [], renderItem }) {
  const [open, setOpen] = useState(true);
  if (!items.length) return null;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
          <h2 className="text-sm font-bold text-gray-800">{title}</h2>
          <Badge color="gray">{items.length}</Badge>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-gray-50 space-y-3 pt-4">
          {items.map((item, i) => renderItem(item, i))}
        </div>
      )}
    </div>
  );
}

// ─── Version Selector Dropdown ────────────────────────────────────────────────

function VersionSelector({ versions, selectedVersion, onSelect, loading }) {
  const [open, setOpen] = useState(false);
  const selected = versions.find((v) => v.version === selectedVersion);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 shadow-sm transition-colors"
      >
        {loading
          ? <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />
          : <History className="w-3.5 h-3.5 text-[#0148AF]" />
        }
        <span>{selected?.label ?? `Version ${selectedVersion}`}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-50 w-72 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Version History</p>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {versions.map((v) => (
                <button
                  key={v.version}
                  onClick={() => { onSelect(v.version); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    v.version === selectedVersion ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${v.isCurrent ? "bg-green-500" : "bg-gray-300"}`} />
                    <div>
                      <p className={`text-sm font-semibold ${v.version === selectedVersion ? "text-[#0148AF]" : "text-gray-700"}`}>
                        {v.label}
                      </p>
                      <p className="text-xs text-gray-400">{fmtDateTime(v.editedAt)}</p>
                    </div>
                  </div>
                  {v.version === selectedVersion && (
                    <ChevronRight className="w-4 h-4 text-[#0148AF]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Restore Confirmation Modal ───────────────────────────────────────────────

function RestoreModal({ version, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <RotateCcw className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="text-base font-bold text-gray-800 text-center mb-1">Restore Version {version}?</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          The current version will be saved to history first, then this snapshot will become the new current version.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
            {loading ? "Restoring…" : "Yes, Restore"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ViewFullCase() {
  const navigate = useNavigate();
  const { id }   = useParams();

  const [versions,        setVersions]        = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [currentVersion,  setCurrentVersion]  = useState(null);
  const [versionsLoading, setVersionsLoading] = useState(true);

  const [data,        setData]        = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error,       setError]       = useState(null);

  const [showRestore,    setShowRestore]    = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [toastMsg,       setToastMsg]       = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 4000);
  };

  // Load version list on mount
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setVersionsLoading(true);
        const res  = await getCaseVersions(id);
        const list = res.data ?? [];
        setVersions(list);
        const current = list.find((v) => v.isCurrent);
        if (current) {
          setSelectedVersion(current.version);
          setCurrentVersion(current.version);
        }
      } catch (err) {
        console.error("getCaseVersions:", err);
        setVersions([]);
        // Will fall back to getCaseById in the data-load effect
        setSelectedVersion(0);
      } finally {
        setVersionsLoading(false);
      }
    })();
  }, [id]);

  // Load snapshot whenever selected version changes
  useEffect(() => {
    if (!id || selectedVersion === null) return;
    (async () => {
      try {
        setDataLoading(true);
        setError(null);
        const res = await getCaseVersion(id, selectedVersion);
        setData(res.data ?? {});
      } catch {
        try {
          const res = await getCaseById(id);
          setData(res.data ?? {});
        } catch (e) {
          setError("Failed to load case details.");
          console.error(e);
        }
      } finally {
        setDataLoading(false);
      }
    })();
  }, [id, selectedVersion]);

  const handleRestore = async () => {
    try {
      setRestoreLoading(true);
      const res  = await restoreCaseVersion(id, selectedVersion);
      showToast(res.message || "Version restored successfully.");
      const vRes = await getCaseVersions(id);
      const list = vRes.data ?? [];
      setVersions(list);
      const newCurrent = list.find((v) => v.isCurrent);
      if (newCurrent) {
        setSelectedVersion(newCurrent.version);
        setCurrentVersion(newCurrent.version);
      }
    } catch {
      showToast("Failed to restore version. Please try again.");
    } finally {
      setRestoreLoading(false);
      setShowRestore(false);
    }
  };

  if (dataLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#0148AF]" />
          <p className="text-sm text-gray-500">Loading case details…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-gray-600 font-medium">{error || "Case not found."}</p>
          <button onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-[#0148AF] text-white text-sm font-semibold hover:opacity-90">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const d = data;
  const isViewingCurrent = selectedVersion === currentVersion;
  const fullName = [d.empFirstName, d.empLastName].filter(Boolean).join(" ");
  const pocFull  = [d.companyPOCFirstName, d.companyPOCLastName].filter(Boolean).join(" ");

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl bg-green-600 text-white text-sm font-semibold shadow-xl animate-fade-in">
          {toastMsg}
        </div>
      )}

      {/* Restore modal */}
      {showRestore && (
        <RestoreModal
          version={selectedVersion}
          onConfirm={handleRestore}
          onCancel={() => setShowRestore(false)}
          loading={restoreLoading}
        />
      )}

      {/* Sticky nav */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 shrink-0">
            <button onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="h-5 w-px bg-gray-200" />
            <img src={mainIcon} alt="Logo" className="h-7 w-auto object-contain" />
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {d.caseNumber && <Badge color="blue">#{d.caseNumber}</Badge>}

            {versionsLoading ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading versions…
              </div>
            ) : versions.length > 0 ? (
              <VersionSelector
                versions={versions}
                selectedVersion={selectedVersion}
                onSelect={setSelectedVersion}
                loading={dataLoading}
              />
            ) : null}

            {!isViewingCurrent && (
              <button onClick={() => setShowRestore(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-all">
                <RotateCcw className="w-3.5 h-3.5" /> Restore
              </button>
            )}

            {isViewingCurrent && (
              <button onClick={() => navigate(`/case/edit/${id}`)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all"
                style={{ backgroundColor: "#0148AF" }}>
                <Pencil className="w-3.5 h-3.5" /> Edit Case
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Historical version banner */}
      {!isViewingCurrent && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-amber-700 text-sm font-medium">
              <History className="w-4 h-4 shrink-0" />
              Viewing <strong>Version {selectedVersion}</strong> — historical snapshot, not the current state.
            </p>
            <button onClick={() => setSelectedVersion(currentVersion)}
              className="text-xs font-semibold text-amber-700 underline underline-offset-2 shrink-0">
              Back to Current
            </button>
          </div>
        </div>
      )}

      {/* Loading overlay during version switch */}
      {dataLoading && data && (
        <div className="fixed inset-0 z-20 bg-white/50 flex items-center justify-center pointer-events-none">
          <Loader2 className="w-8 h-8 animate-spin text-[#0148AF]" />
        </div>
      )}

      {/* Hero strip */}
      <div
        className="relative overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: isViewingCurrent ? "#0148AF" : "#92400e" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
                {isViewingCurrent
                  ? "Case Overview · Current Version"
                  : `Case Overview · Version ${selectedVersion} (Historical)`}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {fullName || "Unnamed Employee"}
              </h1>
              {d.reportedCompanyName && (
                <p className="text-white/70 mt-1 text-sm font-medium flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {d.reportedCompanyName}
                  {d.reportedProjectCity && d.reportedProjectState && (
                    <span className="opacity-70">· {d.reportedProjectCity}, {d.reportedProjectState}</span>
                  )}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {d.managingCompany          && <Badge color="blue">{d.managingCompany}</Badge>}
              {d.workRelatedDetermination && (
                <Badge color={d.workRelatedDetermination.toLowerCase().includes("yes") ? "green" : "amber"}>
                  {d.workRelatedDetermination}
                </Badge>
              )}
              {d.dispositionOfCare        && <Badge color="purple">{d.dispositionOfCare}</Badge>}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Date of Injury",    value: fmtDate(d.reportedDateOfInjury) },
              { label: "MD Notified",       value: fmtDate(d.dateIndustrialMDNotified) },
              { label: "Assigned Provider", value: d.assignedProvider },
              { label: "OSHA Outcome",      value: d.oshaReportingOutcome },
            ].filter(s => s.value).map((stat, i) => (
              <div key={i} className="bg-white/10 rounded-xl px-4 py-3">
                <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest">{stat.label}</p>
                <p className="text-white text-sm font-semibold mt-0.5 leading-snug">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-4">

        <Section icon={ClipboardList} title="Case Allocation Details" color="#0148AF">
          <Field label="Case Number"           value={fmt(d.caseNumber)} />
          <Field label="Managing Company"      value={fmt(d.managingCompany)} />
          <Field label="Assigned Provider"     value={fmt(d.assignedProvider)} />
          <Field label="Secondary Provider"    value={fmt(d.assignedSecondaryProvider)} />
          <Field label="Reporting Structure 1" value={fmt(d.reportingStructure1)} />
          <Field label="Reporting Structure 2" value={fmt(d.reportingStructure2)} />
          <Field label="Date IMD Notified"     value={fmtDate(d.dateIndustrialMDNotified)} />
        </Section>

        <Section icon={Building2} title="Reported Company & Point of Contact" color="#7C3AED">
          <Field label="Company Name"          value={fmt(d.reportedCompanyName)} />
          <Field label="Region"                value={fmt(d.reportedRegion)} />
          <Field label="Project Name / Number" value={fmt(d.reportedProjectNameNumber)} />
          <Field label="Project City"          value={fmt(d.reportedProjectCity)} />
          <Field label="Project State"         value={fmt(d.reportedProjectState)} />
          <Divider />
          <Field label="POC Name"              value={pocFull} />
          <Field label="POC Job Title"         value={fmt(d.companyPOCJobTitle)} />
          <Field label="POC Phone"             value={fmt(d.companyPOCPhoneNumber)} />
          {d.altPOCFullName && <>
            <Divider />
            <Field label="Alt POC Name"        value={fmt(d.altPOCFullName)} />
            <Field label="Alt POC Job Title"   value={fmt(d.altPOCJobTitle)} />
            <Field label="Alt POC Phone"       value={fmt(d.altPOCPhoneNumber)} />
            <Field label="Alt POC Notes"       value={fmt(d.altPOCNotes)} full />
          </>}
        </Section>

        <Section icon={User} title="Reported Employee Details" color="#059669">
          <Field label="First Name"            value={fmt(d.empFirstName)} />
          <Field label="Last Name"             value={fmt(d.empLastName)} />
          <Field label="Date of Birth"         value={fmtDate(d.empDateOfBirth)} />
          <Field label="Age"                   value={fmt(d.empAge)} />
          <Field label="Job Title"             value={fmt(d.empJobTitle)} />
          <Field label="Employing Company"     value={fmt(d.empEmployingCompany)} />
        </Section>

        <Section icon={AlertCircle} title="Reported Injury Details" color="#DC2626">
          <Field label="Date of Injury"             value={fmtDate(d.reportedDateOfInjury)} />
          <Field label="Time of Injury"             value={fmtTime(d.reportedTimeOfInjury, d.reportedTimeOfInjuryAMPM)} />
          <Field label="Time Zone"                  value={fmt(d.reportedTimeZone)} />
          <Field label="Date Company Notified"      value={fmtDate(d.reportedDateCompanyNotified)} />
          <Field label="Body Part Injured"          value={fmt(d.reportedBodyPartInjured)} />
          <Field label="Side of Body"               value={fmt(d.reportedSideOfBodyInjured)} />
          <Field label="Translation Needs"          value={fmt(d.reportedTranslationNeeds)} />
          <Field label="Description of Injury"      value={fmt(d.reportedDescriptionOfInjury)} full />
        </Section>

        <Section icon={Stethoscope} title="Industrial MD Provider Doc Details" color="#D97706">
          <Field label="Tobacco / Nicotine History"    value={fmt(d.tobaccoNicotineHistory)} />
          <Field label="Tetanus Status"                value={fmt(d.tetanusStatus)} />
          <Field label="Medication Allergy Details"    value={fmt(d.medicationAllergyDetails)} full />
          <Field label="Pertinent Medical History"     value={fmt(d.pertinentMedicalHistory)} full />
          <Field label="Non-Pertinent Medical History" value={fmt(d.nonPertinentMedicalHistory)} full />
          <Divider />
          <Field label="Mechanism of Injury"           value={fmt(d.mechanismOfInjury)} full />
          <Field label="Description of Symptoms"       value={fmt(d.descriptionOfSymptoms)} full />
          <Field label="Body Part Injured (Provider)"  value={fmt(d.bodyPartInjured)} />
          <Field label="Side of Body (Provider)"       value={fmt(d.sideOfBodyInjured)} />
          <Field label="Event / Nature / Source"       value={fmt(d.eventNatureSourceOfInjury)} full />
          <Field label="OSHA Reporting Outcome"        value={fmt(d.oshaReportingOutcome)} />
        </Section>

        <Section icon={CheckCircle2} title="Treatment Recommendations" color="#0891B2">
          <Field label="Work-Related Determination"    value={fmt(d.workRelatedDetermination)} />
          <Field label="Disposition of Care"           value={fmt(d.dispositionOfCare)} />
          <Field label="Assessment Summary & Remarks"  value={fmt(d.assessmentSummaryAndRemarks)} full />
          <Field label="Additional Case Notes"         value={fmt(d.additionalCaseNotes)} full />
          <Field label="Internal Case Notes"           value={fmt(d.internalCaseNotes)} full />
          {Array.isArray(d.treatmentRecommendations) && d.treatmentRecommendations.length > 0 && (
            <div className="col-span-full">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Treatment Items</p>
              <div className="space-y-2">
                {d.treatmentRecommendations.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                    <div>
                      {item.title   && <p className="text-sm font-semibold text-gray-800">{item.title}</p>}
                      {item.details && <p className="text-sm text-gray-600 mt-0.5">{item.details}</p>}
                      {item.dateOfTreatment && (
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {fmtDate(item.dateOfTreatment)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>

        {Array.isArray(d.followUpTasks) && d.followUpTasks.length > 0 && (
          <ListSection
            icon={CalendarCheck}
            title="Follow Up & Case Management"
            color="#7C3AED"
            items={d.followUpTasks}
            renderItem={(task, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-100 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-snug">{task.description || "—"}</p>
                  {task.details && <p className="text-xs text-gray-500 mt-1">{task.details}</p>}
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {task.dueDate && (
                      <span className="text-xs text-purple-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {fmtDate(task.dueDate)}
                      </span>
                    )}
                    {task.status && (
                      <Badge color={task.status === "completed" ? "green" : task.status === "cancelled" ? "gray" : "amber"}>
                        {task.status.replace("_", " ")}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
          />
        )}

        {Array.isArray(d.caseUploads) && d.caseUploads.length > 0 && (
          <ListSection
            icon={Paperclip}
            title="Case Uploads"
            color="#059669"
            items={d.caseUploads}
            renderItem={(upload, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{upload.fileName || "Unnamed file"}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {upload.contentType && <span className="text-xs text-gray-400">{upload.contentType}</span>}
                    {upload.visibleToClient && <Badge color="green">Visible to client</Badge>}
                  </div>
                </div>
                {upload.fileUrl && (
                  <a href={upload.fileUrl} target="_blank" rel="noreferrer"
                    className="text-xs font-semibold text-[#0148AF] hover:underline shrink-0">
                    View
                  </a>
                )}
              </div>
            )}
          />
        )}

      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 pt-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {isViewingCurrent ? (
          <button onClick={() => navigate(`/case/edit/${id}`)}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all"
            style={{ backgroundColor: "#0148AF" }}>
            <Pencil className="w-3.5 h-3.5" /> Edit Case
          </button>
        ) : (
          <button onClick={() => setShowRestore(true)}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-all">
            <RotateCcw className="w-3.5 h-3.5" /> Restore Version {selectedVersion}
          </button>
        )}
      </footer>

    </div>
  );
}