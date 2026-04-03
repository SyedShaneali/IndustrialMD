export const formatDate = (val) => {
  if (!val) return "—";
  const d = new Date(val);
  return isNaN(d) ? val : d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
};

export const getStatus = (caseStatus) => {
  if (!caseStatus) return "New";
  const s = caseStatus.toLowerCase();
  if (s === "closed") return "Closed";
  if (s === "open")   return "Open";
  return "New";
};

export const mapCase = (c) => ({
  _id: c._id,

  // Last 8 chars of Mongo ID as display Case #
  id: c._id?.slice(-8).toUpperCase() ?? "—",

  // Step 1 — assigned provider
  assignedProvider: c.assignedProvider ?? "—",

  // Step 2 — company name + region used as location, POC full name
  companyName:     c.reportedCompanyName ?? "—",
  incidentLocation: c.reportedRegion ?? c.reportedProjectCity ?? "—",
  contactFirstName: [c.companyPOCFirstName, c.companyPOCLastName].filter(Boolean).join(" ") || "—",

  // Step 3 — employee full name
  empFirstName: [c.empFirstName, c.empLastName].filter(Boolean).join(" ") || "—",

  // Step 4 — date of injury
  injuryDate: formatDate(c.reportedDateOfInjury),

  // Step 6 — case status (stored on the case root)
  caseStatus: getStatus(c.caseStatus),

  // Step 7 — follow-up date (first task due date, or fallback)
  followUpDate: formatDate(
    c.followUpTasks?.[0]?.dueDate ?? null
  ),

  // Boolean flag — true if a POC phone exists (used for contact icon in table)
  hasContact: !!c.companyPOCPhoneNumber,
});

export const COLUMNS = [
  { key: "id",               label: "Case #"             },
  { key: "assignedProvider", label: "Assigned Provider"  },
  { key: "companyName",      label: "Assigned Company"   },
  { key: "incidentLocation", label: "Location / Region"  },
  { key: "contactFirstName", label: "POC Full Name"      },
  { key: "empFirstName",     label: "Employee Full Name" },
  { key: "injuryDate",       label: "Date of Injury"     },
  { key: "caseStatus",       label: "Status"             },
  { key: "followUpDate",     label: "Follow-Up Date"     },
];