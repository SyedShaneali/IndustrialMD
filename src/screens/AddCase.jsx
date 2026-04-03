import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, Menu, X, Loader2 } from "lucide-react";
import mainIcon from "../assets/icons/main_icon2.png";

import Step1CaseAllocation  from "../components/AddCase/Step1CaseAllocation";
import Step2CompanyContact  from "../components/AddCase/Step2CompayContact";
import Step3EmployeeDetails from "../components/AddCase/Step3EmployeeDetails";
import Step4InjuryDetails   from "../components/AddCase/Step4InjuryDetails";
import Step5ProviderDoc     from "../components/AddCase/Step5Providerdoc";
import Step6Treatment       from "../components/AddCase/Step6Treatment";
import Step7FollowUp        from "../components/AddCase/Step7FollowUp";

import { createCase, updateCase, getCaseById } from "../services/CaseService";

// ─── Constants ────────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Case Allocation Details",                     sub: "Step 1" },
  { label: "Reported Company & Point of Contact Details", sub: "Step 2" },
  { label: "Reported Employee Details",                   sub: "Step 3" },
  { label: "Reported Injury Details",                     sub: "Step 4" },
  { label: "Industrial MD Provider Doc Details",          sub: "Step 5" },
  { label: "Treatment Recommendations",                   sub: "Step 6" },
  { label: "Follow Up & Case Management",                 sub: "Step 7" },
];

const REQUIRED_FIELDS = [
  "managingCompany", "dateIndustrialMDNotified",
  "companyPOCFirstName", "companyPOCLastName",
  "companyPOCJobTitle", "companyPOCPhoneNumber",
  "empFirstName", "empLastName", "empAge",
  "reportedDateOfInjury", "reportedTimeOfInjury",
  "reportedTimeOfInjuryAMPM", "reportedDateCompanyNotified",
];

const STEP_FIELDS = [
  [
    "caseNumber", "managingCompany", "assignedProvider",
    "assignedSecondaryProvider", "reportingStructure1",
    "reportingStructure2", "dateIndustrialMDNotified",
  ],
  [
    "companyPOCFirstName", "companyPOCLastName", "companyPOCJobTitle",
    "companyPOCPhoneNumber", "altPOCFullName", "altPOCJobTitle",
    "altPOCPhoneNumber", "altPOCNotes", "reportedCompanyName",
    "reportedRegion", "reportedProjectNameNumber", "reportedProjectCity",
    "reportedProjectState",
  ],
  [
    "empFirstName", "empLastName", "empDateOfBirth",
    "empAge", "empJobTitle", "empEmployingCompany",
  ],
  [
    "reportedDateOfInjury", "reportedTimeOfInjury", "reportedTimeOfInjuryAMPM",
    "reportedTimeZone", "reportedDateCompanyNotified", "reportedBodyPartInjured",
    "reportedSideOfBodyInjured", "reportedTranslationNeeds",
    "reportedDescriptionOfInjury",
  ],
  [
    "tobaccoNicotineHistory", "tetanusStatus", "medicationAllergyDetails",
    "pertinentMedicalHistory", "nonPertinentMedicalHistory", "mechanismOfInjury",
    "descriptionOfSymptoms", "bodyPartInjured", "sideOfBodyInjured",
    "eventNatureSourceOfInjury", "oshaReportingOutcome",
  ],
  [
    "treatmentRecommendations", "assessmentSummaryAndRemarks",
    "workRelatedDetermination", "dispositionOfCare",
    "additionalCaseNotes", "internalCaseNotes",
  ],
  [
    "followUpTasks", "caseUploads",
  ],
];

// ─── Date input fields ────────────────────────────────────────────────────────
const DATE_INPUT_FIELDS = new Set([
  "dateIndustrialMDNotified",
  "reportedDateOfInjury",
  "reportedDateCompanyNotified",
  "empDateOfBirth",
]);

const toDateInput = (val) => {
  if (!val) return "";
  const d = new Date(val);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
};

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium text-white transition-all duration-300 ${
      type === "error" ? "bg-red-500" : "bg-green-600"
    }`}>
      <span>{message}</span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function SidebarContent({ currentStep, setCurrentStep, setSidebarOpen, isView }) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-8 shrink-0">
        <img src={mainIcon} alt="Logo" className="h-11 w-auto object-contain" />
      </div>
      <nav className="flex flex-col flex-1 overflow-y-auto pr-1">
        {STEPS.map((step, idx) => {
          const isActive    = idx === currentStep;
          const isCompleted = idx < currentStep;
          return (
            <div key={idx} className="flex gap-3">
              <div className="flex flex-col items-center shrink-0">
                <button
                  onClick={() => { setCurrentStep(idx); setSidebarOpen(false); }}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-white border-white text-[#0148AF] shadow-md"
                      : isCompleted
                      ? "bg-green-500 border-green-500 text-white shadow-sm"
                      : "bg-transparent border-white text-white"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3,8 6.5,11.5 13,4.5" />
                    </svg>
                  ) : (idx + 1)}
                </button>
                {idx < STEPS.length - 1 && (
                  <div className={`w-px my-1 flex-1 min-h-[32px] rounded-full ${
                    isCompleted ? "bg-white/60" : "bg-white/20"
                  }`} />
                )}
              </div>
              <div className="pb-10 pt-0.5">
                <p className={`text-sm font-semibold leading-snug transition-colors ${
                  isActive ? "text-white" : isCompleted ? "text-white/80" : "text-white/70"
                }`}>
                  {step.label}
                </p>
                <p className={`text-xs mt-0.5 ${isActive ? "text-white/65" : "text-white/50"}`}>
                  {step.sub}
                </p>
              </div>
            </div>
          );
        })}
      </nav>
      {isView && (
        <p className="text-white/50 text-xs text-center mt-4 shrink-0">View only</p>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CasePage({ mode = "add" }) {
  const navigate = useNavigate();
  const { id }   = useParams();

  const isAdd  = mode === "add";
  const isEdit = mode === "edit";
  const isView = mode === "view";

  const [currentStep, setCurrentStep] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [fetching,    setFetching]    = useState(!isAdd);
  const [toast,       setToast]       = useState({ message: "", type: "success" });
  const [stepData,    setStepData]    = useState([{}, {}, {}, {}, {}, {}, {}]);

  const fileStoreRef   = useRef({});
  const formStartTime  = useRef(Date.now());

  // ─── Stable step change handler ──────────────────────────────────────────
  const handleStepChange = useCallback((stepIndex, newData) => {
    setStepData((prev) => {
      const updated = [...prev];
      updated[stepIndex] = newData;
      return updated;
    });
  }, []);

  // ─── Prefill for edit / view ─────────────────────────────────────────────
  useEffect(() => {
    if (isAdd || !id) return;
    (async () => {
      try {
        setFetching(true);
        const res  = await getCaseById(id);
        const flat = res.data ?? {};

        const prefilled = STEP_FIELDS.map((fields) =>
          fields.reduce((acc, key) => {
            if (flat[key] !== undefined) {
              acc[key] = DATE_INPUT_FIELDS.has(key)
                ? toDateInput(flat[key])
                : flat[key];
            }
            return acc;
          }, {})
        );

        setStepData(prefilled);
        formStartTime.current = Date.now();
      } catch (err) {
        showToast("Failed to load case details.", "error");
        console.error(err);
      } finally {
        setFetching(false);
      }
    })();
  }, [id]);

  // ─── Toast ───────────────────────────────────────────────────────────────
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 4000);
  };

  // ─── Navigation ──────────────────────────────────────────────────────────
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── File registration ───────────────────────────────────────────────────
  const handleRegisterFile = (file) => {
    const key = `${file.name}_${Date.now()}_${Math.random()}`;
    fileStoreRef.current[key] = file;
    return key;
  };

  // ─── Log time taken ──────────────────────────────────────────────────────
  const logTimeTaken = () => {
    const timeTakenMs = Date.now() - formStartTime.current;
    const hours   = Math.floor(timeTakenMs / 3600000);
    const minutes = Math.floor((timeTakenMs % 3600000) / 60000);
    const seconds = Math.floor((timeTakenMs % 60000) / 1000);
    const parts = [];
    if (hours   > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);
    console.log("─────────────────────────────────────────");
    console.log(`📋 Form Mode    : ${isAdd ? "Add New Case" : "Edit Case"}`);
    console.log(`⏱️  Time Taken   : ${parts.join(" ")} (${timeTakenMs}ms)`);
    console.log(`🕐 Started At   : ${new Date(formStartTime.current).toLocaleTimeString()}`);
    console.log(`🕑 Submitted At : ${new Date().toLocaleTimeString()}`);
    console.log("─────────────────────────────────────────");
    return timeTakenMs;
  };

  // ─── Submit (shared by both Add final step & Edit save anywhere) ─────────
  const handleSubmit = async () => {
    const payload = Object.assign({}, ...stepData);

    if (isAdd) {
      const missing = REQUIRED_FIELDS.filter((key) => !payload[key]);
      if (missing.length > 0) {
        showToast("Please fill in all required fields.", "error");
        return;
      }
    }

    const timeTakenMs = logTimeTaken();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("formFillDurationMs", timeTakenMs);

      const caseUploads = payload.caseUploads || [];
      const uploadsMeta = [];

      caseUploads.forEach((upload) => {
        if (upload._fileKey) {
          const file = fileStoreRef.current[upload._fileKey];
          if (file instanceof File) {
            formData.append("files", file);
            uploadsMeta.push({
              fileName:        upload.fileName,
              contentType:     upload.contentType,
              visibleToClient: upload.visibleToClient || false,
            });
          } else {
            console.error("File not found in store for key:", upload._fileKey);
          }
        } else {
          uploadsMeta.push({
            fileName:        upload.fileName,
            contentType:     upload.contentType,
            visibleToClient: upload.visibleToClient || false,
            publicId:        upload.publicId,
            fileUrl:         upload.fileUrl,
          });
        }
      });

      formData.append("caseUploads",              JSON.stringify(uploadsMeta));
      formData.append("treatmentRecommendations", JSON.stringify(payload.treatmentRecommendations || []));
      formData.append("followUpTasks",            JSON.stringify(payload.followUpTasks            || []));

      const skip = new Set(["treatmentRecommendations", "followUpTasks", "caseUploads", "files"]);

      Object.entries(payload).forEach(([key, value]) => {
        if (skip.has(key))                                         return;
        if (value === undefined || value === null || value === "") return;
        if (typeof value === "object" && !(value instanceof File)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      let res;
      if (isAdd) {
        res = await createCase(formData);
      } else {
        res = await updateCase(id, formData);
      }

      if (res.success) {
        showToast(`Case ${isAdd ? "created" : "updated"} successfully!`, "success");
        setTimeout(() => navigate("/user-dashboard"), 1500);
      }
    } catch (err) {
      const rawMsg = err?.response?.data?.message;
      const msg = typeof rawMsg === "string"
        ? rawMsg
        : rawMsg
        ? JSON.stringify(rawMsg)
        : "Check your connection or console for errors.";
      showToast(msg, "error");
      console.error("Submission Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ─── Step renderer ───────────────────────────────────────────────────────
  const renderStep = () => {
    const props = {
      data:     stepData[currentStep],
      onChange: isView ? () => {} : (newData) => handleStepChange(currentStep, newData),
      readOnly: isView,
    };
    switch (currentStep) {
      case 0: return <Step1CaseAllocation  {...props} />;
      case 1: return <Step2CompanyContact  {...props} />;
      case 2: return <Step3EmployeeDetails {...props} />;
      case 3: return <Step4InjuryDetails   {...props} />;
      case 4: return <Step5ProviderDoc     {...props} />;
      case 5: return <Step6Treatment       {...props} />;
      case 6: return <Step7FollowUp        {...props} onRegisterFile={handleRegisterFile} />;
      default: return null;
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0148AF]" />
      </div>
    );
  }

  const pageTitle = isAdd ? "Add New Case" : isEdit ? "Edit Case" : "View Case";

  // ─── Footer right-side button logic ──────────────────────────────────────
  const renderRightButton = () => {
    // VIEW mode
    if (isView) {
      return currentStep < STEPS.length - 1 ? (
        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all"
          style={{ backgroundColor: "#0148AF" }}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gray-500 hover:bg-gray-600 transition-all"
        >
          Close
        </button>
      );
    }

    // ADD mode — last step shows Submit, otherwise Next
    if (isAdd) {
      return currentStep < STEPS.length - 1 ? (
        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all"
          style={{ backgroundColor: "#0148AF" }}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm transition-all"
        >
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
            : <>✓ Submit Case</>}
        </button>
      );
    }

    // EDIT mode — Save Changes button on EVERY step + Next (if not last step)
    if (isEdit) {
      return (
        <div className="flex items-center gap-2">
          {/* Save Changes — always visible in edit mode */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm transition-all"
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
              : <>✓ Save Changes</>}
          </button>

          {/* Next — only if not on last step */}
          {currentStep < STEPS.length - 1 && (
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-50 transition-all"
              style={{ backgroundColor: "#0148AF" }}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex">

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <img src={mainIcon} alt="Logo" className="h-8 w-auto object-contain" />
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">
            Step {currentStep + 1}/{STEPS.length}
          </span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen
              ? <X    className="w-5 h-5 text-gray-600" />
              : <Menu className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed top-0 left-0 bottom-0 z-40 w-80 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="m-3 rounded-2xl p-6 pl-8 h-[calc(100%-24px)] overflow-y-auto" style={{ backgroundColor: "#0148AF" }}>
          <SidebarContent
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            setSidebarOpen={setSidebarOpen}
            isView={isView}
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col shrink-0 p-4" style={{ width: "360px" }}>
        <div className="rounded-3xl p-6 pl-8 flex-1 flex flex-col" style={{ backgroundColor: "#0148AF" }}>
          <SidebarContent
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            setSidebarOpen={setSidebarOpen}
            isView={isView}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:py-4 lg:pr-4">
        <div className="flex-1 flex flex-col bg-white lg:rounded-2xl overflow-hidden lg:border lg:border-gray-100 lg:shadow-sm">

          {/* Page title bar */}
          <div className="px-6 sm:px-10 pt-8 pb-2 flex items-center justify-between">
            <h1 className="text-xl font-bold text-[#1a2540]">{pageTitle}</h1>
            {isView && (
              <button
                onClick={() => navigate(`/case/full/${id}`)}
                className="text-sm font-semibold text-[#0148AF] border border-[#0148AF] px-4 py-1.5 rounded-lg hover:bg-[#0148AF] hover:text-white transition-all"
              >
                View Full Case
              </button>
            )}
          </div>

          {/* Form area */}
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8">
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="shrink-0 px-6 sm:px-10 py-5 border-t border-gray-200 flex items-center justify-between bg-white">

            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <span className="text-sm text-gray-400 font-medium hidden sm:block">
              Step {currentStep + 1} of {STEPS.length}
            </span>

            {renderRightButton()}

          </div>
        </div>
      </div>
    </div>
  );
}